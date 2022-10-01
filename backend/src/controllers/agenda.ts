const Agenda = require("agenda");
const mongoConnectionString = `mongodb+srv://csaunders:QBH63aIcp3FZAEOP@cluster0.cyohgxm.mongodb.net/?retryWrites=true&w=majority`;

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define("checkin for flight", async (job: any) => {
    const { confirmation, firstName, lastName } = job.attrs.data;
    setTimeout(() => {}, 5000);
});

agenda.define("test me", (job: any) => {
    console.log("Tested");
});

export default agenda;
