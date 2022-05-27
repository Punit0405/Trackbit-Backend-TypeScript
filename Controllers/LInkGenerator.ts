import * as branchio from 'branchio-sdk';

const client = branchio({ 
    appId: process.env.APPID,
    key: process.env.BRANCH_KEY,
    secret:process.env.BRANCH_SECRET
  });