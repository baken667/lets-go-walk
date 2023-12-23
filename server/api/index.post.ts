import nodemailer from "nodemailer";
export default defineEventHandler(async (event) => {
  const { mailPass, mailPort, mailServ, mailTo, mailUser } = useRuntimeConfig();

  const transport = nodemailer.createTransport({
    host: mailServ,
    service: "gmail",
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  const options = {
    from: mailUser,
    to: mailTo,
    subject: "С ТОБОЙ СОГЛАСИЛИСЬ ПОГУЛЯТЬ!",
    text: "Рад за тебя, браток!",
  };

  await transport.sendMail(options);

  console.log('sent')
});
