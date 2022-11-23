import { Router, Request, Response } from "express";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import { FormType } from "src/types";
import dotenv from 'dotenv';

dotenv.config();
const router : Router = Router();
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

router.post('/send-email', async (req: Request<{},{},FormType>, res: Response) => {
    const {name, email, message} = req.body;
    let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD,
        },
    });

    const contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Name: ${name}<li/>
            <li>Email: ${email}<li/>
        </ul>
        <p>${message}</p>
    `;

    const mailOption : Mail.Options = {
        from: `RoyAndresDev <info@royandresdev.com>`,
        to: EMAIL,
        subject: name,
        html: contentHTML
    }

    await transporter.sendMail(mailOption, (err, info)=> {
        if(err) {
            console.log(err);
        }
        console.log(info);
    }) 
    res.json({message: 'Succesful', data: req.body});
})


export default router;
