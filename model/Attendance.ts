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
    //@PrimaryGeneratedColumn('uuid')
    id: string = 'attendance';
    members = async () => {
        const member = await dbClient.get(gql`{member}`)
        return member
    }

    @ManyToOne(() => Event, event => event.attendances)
    event!: Relation<Event>;

    @ManyToOne(() => Member, member => member.attendances)
    member!: Relation<Member>;

    @Column({ type: 'int' })
    timeliness!: number;
    client: any;

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
        const data = {
            newFace,
            existingFace
        }
        return { data, error}
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
                    id: undefined,
                    model: []
                }
            ],
            id: "",
            sections: [],
            layout: "Grid",
            size: ""
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
            ],
            sections: []
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
                id: '',
                sections: [],
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
            layout: 'Grid',
            id: "",
            children: []
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
            columns: [],
            sections: [],
            id: undefined
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

    async filter() {
        const member =  await this.members()
        return new Filters ({
        indexName: "Members",
        rangeList: [],
        checks: [
            {
                attribute: 'Members',
                values: member.data.map((member: { firstName: any; lastName: any; }) => {
                    return {
                        label: `${member.firstName} ${member.lastName}`
                    };
                }),
                id: undefined,
                model: []
            }
        ],
        id: "",
        sections: [],
        layout: "Grid",
        size: ""
    })}

    async create() {
        
        const actions = [
                new Action({
                    event: async () => {
                        const { data, error } = await this.captureFaces()
                        
                    },
                    label: 'capture faces',
                }),
                new Action({
                    event: "Route",
                    args: {
                        name: 'categories',
                        params: {
                            categories: 'memberView'
                        }
                    },
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
    
        async memberView(eventId: any) {
            const members = await this.members()
        return new PageView({
            sections: [
                await this.filter(),
                 new Action({
                    label: 'Check In',
                    async event() {
                        const query: QueryType = {
                            name: "attendance",
                            data: members.data.map((member: { id: any; }) => {
                                return {
                                    event_id: eventId,
                                    member_id: member.id, 
                                    time_taken: new Date()
                                }
                            }),
                            filters: [],
                            columns: []
                        }
                        const { data, error} = await dbClient.post(query)
                        return { data, error }
                    },
                    onResult: {
                        redirect: {
                            path: '/events',
                            params: {
                                id: eventId
                            }
                        }
                    }
                 })
            ],
            id: "",
            layout: "Grid",
            children:[]
        })
        }
}