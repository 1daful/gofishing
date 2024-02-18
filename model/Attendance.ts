import { dbClient } from "../config/model";
import { IDataView } from "./IDataView";
import { EdiStorage, QueryType } from "@edifiles/services";
import { useRouter } from "vue-router";
import { Series } from "../src/utils/DataTypes";
import gql from "graphql-tag";
import { Action, DataGraph, DataTable, Filters, FormType, PageView, QuestionType, View } from "../src/utils/types";
import { Member } from "./Member";
import { Event } from "./Event";
import { useDate } from "../src/utils/useDate";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Relation } from "typeorm";

@Entity()
export class Attendance implements IDataView {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Event, event => event.attendances)
    event!: Relation<Event>;

    @ManyToOne(() => Member, member => member.attendances)
    member!: Relation<Member>;

    @Column({ type: 'int' })
    timeliness!: number;

    //client = new RestClient(config.api.)
    async captureFaces() {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = mediaStream;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Wait for the video to load
        await new Promise(resolve => {
            video.addEventListener('loadedmetadata', resolve);
        });

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');

        // Convert the image data to a Blob
        const blob = new Blob([imageData], { type: 'image/png' });

        // Send the image to the server
        const formData = new FormData();
        formData.append('image', blob);
        const { newFace, existingFace, error } = await this.client.post('recognise_face', formData)

        /*await fetch('/api/recognise_face', {
            method: 'POST',
            body: formData
        });*/

        if (newFace) {
            const storage = new EdiStorage()
            storage.post('member', '/member', blob)
            //const client = new SDKClient(storage)
            //client.post('newFace', blob)
            newFace.forEach((face: any) => {
                dbClient.post(face)
                dbClient.post(face)
            });

            useRouter().push({
                name: 'type',
                params: {
                    type: 'members' 
                }
            })
        }

        if(existingFace) {
            const query =`{
                member(id: ${existingFace})
            }`
            existingFace.forEach((face: any) => {
                dbClient.post(face)
            });
            useRouter().push({
                name: 'type',
                params: {
                    type: 'members',
                    filters: query
                }
            })
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
                } else {
                    console.log('Image uploaded successfully:', data.Key);
                }
            }, 'image/jpeg');
    
            stream.getTracks().forEach(track => track.stop()); // Stop video track
        };
    }

    /*async create() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);

        const captureImage = async () => {
        const blob = await imageCapture.captureFrame();
        const imageData = new ImageData(blob);
        return imageData;
        };

    }*/

    /*async create() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        const streamURL = URL.createObjectURL(stream);
        const imageFile = new File([streamURL], 'capturedImage.jpg', { type: 'image/jpeg' });
        const { storage } = supabase;

        storage.from(imageFile).upload('capturedImage.jpg')
        .then(uploadedFile => {
        console.log('Image uploaded successfully:', uploadedFile.publicUrl);
        })
        .catch(error => {
        console.error('Failed to upload image:', error);
        });
        URL.revokeObjectURL(streamURL);
    }*/
    
    readSingle(id: string) {
    }

    async getListData(userId: string) {
        const series: Series = [{
            type: "area",
            data: [{
                x: '',
                y: ''
            }]
        }]
        const query: QueryType = {
            name: "",
            data: undefined,
            filters: [
                {
                op: 'eq',
                col: 'user_id',
                val: userId
            }
            ],
            columns: []
        }
        const attendanceList: Attendance[] = await dbClient.get(query)


        attendanceList.forEach((attendance) => {
            let data = {
                x: 0,
                y: 0
            }

            data.x = attendance.event.start_at.getDate()
            data.y = attendance.timeliness
            series[0].data.push(data)
        });

        const average: Filters = {
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
        }

        const date: QuestionType = {
            title: "",
            id: '',
            index: 0,
            actions: {},
            content: [
                {
                    question: '',
                    name: '',
                    inputType: 'date'
                }
            ]
        }
        
        const graphView: View = {
            id: "",
            layout: "Grid",
            sections: [
                date,
                average,
                series
            ],
            size: "",
            navType: "top"
        }

        const getDonut = async (timeDiff: string)=> {
            const earlyDonutData = await this.getTimelinessCount(userId, timeDiff)
            const earlyDonut: DataGraph = new DataGraph({
                xaxisType: "number",
                chartType: 'donut',
                series: earlyDonutData.series,
                label: earlyDonutData.label
            })
            return earlyDonut
        }

        const lateView: View = {
            sections: [await this.getTimeliness('late', useDate().get().getDate().toString()), getDonut('late')],
            heading: 'Your Late Arrival',
            id: "lateView",
            layout: "Grid",
            size: "",
            navType: "top"
        }

        const earlyView: View = {
            sections: [await this.getTimeliness('early', useDate().get().toDateString()), getDonut('early')],
            heading: 'Your Early Arrival',
            id: "earlyView",
            layout: "Grid",
            size: "",
            navType: "top"
        }

        const view: PageView = new PageView({
            sections: [
                graphView,
                lateView,
                earlyView,
                getDonut("late"),
                getDonut("early")
            ],
            id: "",
            children:[],
            layout: 'Grid'
        })
        return view
    }

    async getTimeliness (timeDiff: string, date: string) {
        const query = gql `
        {
            attendance(timeStatus: ${timeDiff}) {
                timeDiff
                event(startAt: ${date}) {
                    startAt
                    name
                }
            }
        }`
        const data = await dbClient.get(query)

        const table: DataTable = {
            rows: data.filter((attendance: { event: { startAt: any; name: any; }; timeDiff: any; }) => {
                return {
                    date: attendance.event.startAt,
                    name: attendance.event.name,
                    time: attendance.timeDiff
                };
            }),
            columns: []
        }

        return table
    }

    async getTimelinessCount(userId: string, timeDiff: string) {
        const query = gql`
        {
            timelinessCount(userId: ${userId}, timeDiff: ${timeDiff}){
                count
                event {
                    id
                    name
                }
            }
        }`

        const data = await dbClient.get(query)
        const series: [] = data.map((entry: { eventName: any; }) => entry.eventName)
        const label: [] = data.map((entry: any) => entry)
        return { series, label }
    }

    async getCreateData(eventId: any) {
        const members = await dbClient.get(gql`{members}`)
        
        const filter: Filters = {
            indexName: "Members",
            rangeList: [],
            checks: [
                {
                    attribute: 'Members',
                    values: members.map((member: { firstName: any; lastName: any; }) => {
                        return {
                            label: `${member.firstName} ${member.lastName}`
                        }
                    })
                }
            ]
        }
        const memberView: View = new View({
            sections: [
                 filter,
                 new Action({
                    event() {
                        const query: QueryType = {
                            name: "member",
                            data: members.map((member: { id: any; }) => {
                                return {
                                    eventId,
                                    userId: member.id, 
                                    timeTaken: new Date()
                                }
                            }),
                            filter: [],
                            columns: []
                        }
                        dbClient.post(query)
                    }
                 })
            ],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        })
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
            ]

        const view: PageView = new PageView({
            id: "",
            layout: "Grid",
            sections: actions,
            children: []
        })
        return view

    }
}