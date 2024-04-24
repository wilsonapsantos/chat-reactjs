import * as signalR from "@microsoft/signalr";
const URL = process.env.HUB_ADDRESS ?? "https://api-lukrey-dev.azurewebsites.net/chat"; //or whatever your backend port is

const idlocador = "fad3d968-00c2-4f2a-a28d-23de3a474964";
const idlocatario = "64566f00-d7fd-4352-abee-9f125fce6e05";

class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (idResponsavel: string, mensagem: string, dataHora: string) => void) => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        this.events = (onMessageReceived) => {
            this.connection.on("chat/" + idlocador + "/" + idlocatario, (idResponsavel, mensagem, dataHora) => {

                console.log(idResponsavel + "-" + mensagem + "-" + dataHora);

                onMessageReceived(idResponsavel, mensagem, dataHora);
            });
        };
    }
    public newMessage = (messages: string) => {

        if (messages !== null && messages.length > 0) {
            this.connection.send("NovaMensagem",
                idlocador,
                idlocatario,
                messages,
                idlocador)
                .then(x => console.log("sent"))
        }
    }
    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}
export default Connector.getInstance;