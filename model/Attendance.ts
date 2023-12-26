import { dbClient } from "../config/model";
import { IData } from "./IData";
import { IDataView } from "./IDataView";
import { EdiStorage, RestClient, SDKClient } from "@edifiles/services";
import { config } from "../public/config";
import { useRouter } from "vue-router";
import { Series } from "../src/utils/DataTypes";
import gql from "graphql-tag";
import { Action, Filters, FormType, PageView, QuestionType } from "../src/utils/types";

export class Attendance implements IDataView{
    client = new RestClient(config)
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
            newFace.forEach(face => {
                dbClient.post('member', face)
                dbClient.post('attendance', face)
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
            existingFace.forEach(face => {
                dbClient.post('attendance', face)
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

    async getAnalytics(userId: string) {
        const series: Series = [{
            type: "area",
            data: [{
                x: '',
                y: ''
            }]
        }]
        const query = gql`attendance (user_id: ${userId})`
        const attendanceList = await dbClient.get('', query)


        attendanceList.forEach(attendance => {
            let data = {
                x: 0,
                y: 0
            }

            data.x = attendance.event.startAt
            data.y = attendance.timeliness
            series[0].data.push(data)
        });

        const dateOptions: QuestionType = {
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
        }

        const average: Filters = {
            index: "",
            rangeList: [],
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

        const view: PageView = {
            id: "",
            layout: "Grid",
            sections: [
                dateOptions,
                average,
                series
            ],
            children: []
        }
    }

    getCreateData(data?: any) {
        const form: FormType = new FormType('', 'Submit', [
            {
                index: 1,
                title: '',
                actions: {
                    upload: new Action({
                        event: this.captureFaces,
                        label: 'capture faces',
                        args: undefined,
                        onResult: [],
                        onError: []
                    })
                }
            }
        ])

        const view: PageView = new PageView({
            id: "",
            layout: "Grid",
            sections: [form],
            children: []
        })

    }

    getListData(query?: any) {
        throw new Error("Method not implemented.");
    }

    getSingleData(id: string) {
        throw new Error("Method not implemented.");
    }
}