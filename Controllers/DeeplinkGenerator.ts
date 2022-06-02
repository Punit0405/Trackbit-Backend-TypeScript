import axios from 'axios';
import 'dotenv/config'

const LinkGenerator = async (str="")=>{
    const response = await axios.post("https://api2.branch.io/v1/url",{
        "branch_key": `${process.env.BRANCH_KEY}`,
        "channel": "facebook",
        "feature": "onboarding",
        "campaign": "new product",
        "stage": "new user",
        "tags": ["one", "two", "three"],
        "data": {
          "$canonical_identifier": "content/123",
          "$og_title": `${str}`,
          "$og_description": "Description from Deep Link",
          "$og_image_url": "http://www.lorempixel.com/400/400/",
          "$desktop_url": "http://www.example.com",
          "custom_boolean": true,
          "custom_integer": 1243,
          "custom_string": "everything",
          "custom_array": [1,2,3,4,5,6],
          "custom_object": { "random": "dictionary" }
        }
      })
      return response.data.url;
    
}
const LinkDeleter = async (url="")=>{
    const response = await axios.delete(`https://api2.branch.io/v1/url?url=${url}&app_id=${process.env.APPID}`,{
        headers:{
            "Access-Token": process.env.BRANCH_ACCESSTOKEN as string
        },
    })
      return response.data;
    
}
LinkGenerator("Hello").then((data)=>{console.log(data)});
LinkDeleter('https://uo0oq.test-app.link/e9P34Iwjvqb').then((data)=>{
    console.log(data);
})