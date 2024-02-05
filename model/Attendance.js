var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { dbClient } from "../config/model";
import { EdiStorage } from "@edifiles/services";
import { useRouter } from "vue-router";
import gql from "graphql-tag";
import { Action, DataGraph, PageView, View } from "../src/utils/types";
import { Member } from "./Member";
import { Event } from "./Event";
import { filter } from "@edifiles/services/dist/module/utility/Query";
import { useDate } from "../src/utils/useDate";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
let Attendance = class Attendance {
    async captureFaces() {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = mediaStream;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        await new Promise(resolve => {
            video.addEventListener('loadedmetadata', resolve);
        });
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        const blob = new Blob([imageData], { type: 'image/png' });
        const formData = new FormData();
        formData.append('image', blob);
        const { newFace, existingFace, error } = await this.client.post('recognise_face', formData);
        if (newFace) {
            const storage = new EdiStorage();
            storage.post('member', '/member', blob);
            newFace.forEach((face) => {
                dbClient.post('member', face);
                dbClient.post('attendance', face);
            });
            useRouter().push({
                name: 'type',
                params: {
                    type: 'members'
                }
            });
        }
        if (existingFace) {
            const query = `{
                member(id: ${existingFace})
            }`;
            existingFace.forEach((face) => {
                dbClient.post('attendance', face);
            });
            useRouter().push({
                name: 'type',
                params: {
                    type: 'members',
                    filters: query
                }
            });
        }
    }
    async captureAndUpload() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        video.onloadedmetadata = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(async (blob) => {
                const file = new File([blob], 'capturedImage.jpg', { type: 'image/jpeg' });
                const { storage } = supabase;
                const { data, error } = await storage.from('your_bucket').upload('capturedImage.jpg', file);
                if (error) {
                    console.error('Failed to upload image:', error);
                }
                else {
                    console.log('Image uploaded successfully:', data.Key);
                }
            }, 'image/jpeg');
            stream.getTracks().forEach(track => track.stop());
        };
    }
    readSingle(id) {
    }
    async getListData(userId) {
        const series = [{
                type: "area",
                data: [{
                        x: '',
                        y: ''
                    }]
            }];
        const query = {
            name: "",
            data: undefined,
            filter: [filter('eq', "user_id", userId)],
            columns: []
        };
        const attendanceList = await dbClient.get(query);
        attendanceList.forEach((attendance) => {
            let data = {
                x: 0,
                y: 0
            };
            data.x = attendance.event.start_at.getDate();
            data.y = attendance.timeliness;
            series[0].data.push(data);
        });
        const average = {
            indexName: "",
            checks: [
                {
                    attribute: '',
                    values: [
                        {
                            label: 'Show Church Average'
                        }
                    ],
                }
            ]
        };
        const date = {
            title: "",
            index: 0,
            actions: {},
            content: [
                {
                    question: '',
                    name: '',
                    answer: '',
                    inputType: 'date'
                }
            ]
        };
        const graphView = {
            id: "",
            layout: "Grid",
            sections: [
                date,
                average,
                series
            ],
            size: "",
            navType: "top"
        };
        const getDonut = async (timeDiff) => {
            const earlyDonutData = await this.getTimelinessCount(userId, timeDiff);
            const earlyDonut = new DataGraph({
                xaxisType: "number",
                chartType: 'donut',
                series: earlyDonutData.series,
                label: earlyDonutData.label
            });
            return earlyDonut;
        };
        const lateView = {
            sections: [await this.getTimeliness('late', useDate().get().getDate().toString()), getDonut('late')],
            heading: 'Your Late Arrival',
            id: "lateView",
            layout: "Grid",
            size: "",
            navType: "top"
        };
        const earlyView = {
            sections: [await this.getTimeliness('early', useDate().get().toDateString()), getDonut('early')],
            heading: 'Your Early Arrival',
            id: "earlyView",
            layout: "Grid",
            size: "",
            navType: "top"
        };
        const view = new PageView({
            sections: [
                graphView,
                lateView,
                earlyView,
                getDonut("late"),
                getDonut("early")
            ],
            id: "",
            children: [],
            layout: 'Grid'
        });
        return view;
    }
    async getTimeliness(timeDiff, date) {
        const query = gql `
        {
            attendance(timeStatus: ${timeDiff}) {
                timeDiff
                event(startAt: ${date}) {
                    startAt
                    name
                }
            }
        }`;
        const data = await dbClient.get(query);
        const table = {
            row: data.filter((attendance) => {
                return {
                    date: attendance.event.startAt,
                    name: attendance.event.name,
                    time: attendance.timeDiff
                };
            })
        };
        return table;
    }
    async getTimelinessCount(userId, timeDiff) {
        const query = gql `
        {
            timelinessCount(userId: ${userId}, timeDiff: ${timeDiff}){
                count
                event {
                    id
                    name
                }
            }
        }`;
        const data = await dbClient.get(query);
        const series = data.map((entry) => entry.eventName);
        const label = data.map((entry) => entry);
        return { series, label };
    }
    async getCreateData(eventId) {
        const members = await dbClient.get(gql `{members}`);
        const filter = {
            indexName: "Members",
            rangeList: [],
            checks: [
                {
                    attribute: 'Members',
                    values: members.map((member) => {
                        return {
                            label: `${member.firstName} ${member.lastName}`
                        };
                    })
                }
            ]
        };
        const memberView = new View({
            sections: [
                filter,
                new Action({
                    event() {
                        const query = {
                            name: "member",
                            data: members.map((member) => {
                                return {
                                    eventId,
                                    userId: member.id,
                                    timeTaken: new Date()
                                };
                            }),
                            filter: [],
                            columns: []
                        };
                        dbClient.post(query);
                    }
                })
            ],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        });
        const actions = [
            new Action({
                event: this.captureFaces,
                label: 'capture faces',
            }),
            new Action({
                event: "Modal",
                args: memberView,
                label: "Mark members"
            })
        ];
        const view = new PageView({
            id: "",
            layout: "Grid",
            sections: actions,
            children: []
        });
        return view;
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Attendance.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Event, event => event.attendances),
    __metadata("design:type", Object)
], Attendance.prototype, "event", void 0);
__decorate([
    ManyToOne(() => Member, member => member.attendances),
    __metadata("design:type", Object)
], Attendance.prototype, "member", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], Attendance.prototype, "timeliness", void 0);
Attendance = __decorate([
    Entity()
], Attendance);
export { Attendance };
