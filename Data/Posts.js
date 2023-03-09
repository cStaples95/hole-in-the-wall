import { USERS } from "./Users";

export const POSTS = [

    {
        profile_img: USERS[0].profile_img,
        username: USERS[0].name,
        caption:"Matthew Sky was Here",
        time: "Just Now",
        upload_img: "",
        likes:"121",
        share:"11",
        comments:[
            {
                profile_img:USERS[4].profile_img,
                name: USERS[4].name,
                comment:"So Nice"
            },
            {
                profile_img:USERS[2].profile_img,
                name:USERS[2].name,
                comment:"wow"
            },
        ]
    },
   
    {
        profile_img: USERS[1].profile_img,
        username: USERS[1].name,
        time: "10 m.",
        caption:"How's it going",
        upload_img: "",
        likes:"147",
        share:"7",
        comments:[
            {
                profile_img:USERS[0].profile_img,
                name:USERS[0].name,
                comment:"So Nice"
            },
            {
                profile_img:USERS[3].profile_img,
                name:USERS[3].name,
                comment:"wow"
            },
        ]
    },

    {
        profile_img: USERS[2].profile_img,
        username: USERS[2].name,
        time: "1 h.",
        caption:"",
        upload_img: "",
        likes:"1.2k",
        share:"7",
        comments:[
            {
                profile_img:USERS[1].profile_img,
                name:USERS[1].name,
                comment:"So Nice"
            },
            {
                profile_img:USERS[3].profile_img,
                name:USERS[3].name,
                comment:"wow"
            },
            {
                profile_img:USERS[1].profile_img,
                name:USERS[1].name,
                comment:"Lame"
            },
        ]
    },
    {
        profile_img: USERS[4].profile_img,
        username: USERS[4].name,
        time: "1 h.",
        caption:"",
        upload_img: "",
        likes:"147",
        share:"7",
        comments:[
            {
                profile_img:USERS[1].profile_img,
                name:USERS[1].name,
                comment:"So Nice"
            },
            {
                profile_img:USERS[3].profile_img,
                name:USERS[3].name,
                comment:"wow"
            },
            {
                profile_img:USERS[0].profile_img,
                name:USERS[0].name,
                comment:"Lame"
            },
        ]
    },

    {
        profile_img: USERS[3].profile_img,
        username: USERS[3].name,
        time: "1 D.",
        upload_img: "",
        likes:"147",
        caption:"Howdy",
        share:"7",
        comments:[
            {
                profile_img:USERS[0].profile_img,
                name:USERS[0].name,
                comment:"So Nice"
            },
            {
                profile_img:USERS[1].profile_img,
                name:USERS[1].name,
                comment:"wow"
            },
        ]
    },

]