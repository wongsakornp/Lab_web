const RB = ReactBootstrap;
const { Alert, Card, Button, table } = ReactBootstrap

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

function EditButton({ std, app }) {
    return <button onClick={() => app.edit(std)}>แก้ไข</button>
}


function DeleteButton({ std, app }) {
    return <button onClick={() => app.delete(std)}>ลบ</button>
}


//Use for loop
// function StudentTable({ data, app }) {
//     var rows = [];
//     for (var s of data) {
//         rows.push(<tr>
//             <td>{s.id}</td>
//             <td>{s.title}</td>
//             <td>{s.fname}</td>
//             <td>{s.lname}</td>
//             <td>{s.email}</td>
//         </tr>);
//     }
//     return <table className='table'>
//         <tr>
//             <td>รหัส</td>
//             <td>คำนำหน้า</td>
//             <td>ชื่อ</td>
//             <td>สกุล</td>
//             <td>email</td>
//         </tr>
//         {rows}
//     </table>
// }


// use Array.map
function StudentTable({ data, app }) {
    return <table className='table mt-5'>
        <thead>
            <tr>
                <th>รหัส</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ</th>
                <th>สกุล</th>
                <th>email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((s) => <tr className="table-info">
                    <td>{s.id}</td>
                    <td>{s.title}</td>
                    <td>{s.fname}</td>
                    <td>{s.lname}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td><EditButton std={s} app={app} /></td>
                    <td><DeleteButton std={s} app={app} /></td>
                </tr>)
            }
        </tbody>
    </table>
}


// TextInput
function TextInput({ label, app, value, style }) {
    return <label className="form-label">
        {label}:
        <input className="form-control" style={style}
            value={app.state[value]} onChange={(ev) => {
                var s = {};
                s[value] = ev.target.value;
                app.setState(s)
            }
            }></input>
    </label>;
}


class App extends React.Component {

    // config header 
    title = (
        <RB.Alert variant="info">
            <b>Work6 :</b> Firebase
        </RB.Alert>
    );

    // config footer
    footer = (
        <div>
            By 643020640-2 Wongsakorn Potavech <br />
            College of Computing, Khon Kaen University
        </div>
    );


    readData() {
        db.collection("students").get().then((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
            });
            console.log(stdlist);
            this.setState({ students: stdlist });
        });
    }


    autoRead() {
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ students: stdlist });
        });
    }


    state = {
        scene: 0,
        students: [],
        stdid: "",
        stdtitle: "",
        stdfname: "",
        stdlname: "",
        stdemail: "",
        stdphone: "",
    }


    insertData() {
        db.collection("students").doc(this.state.stdid).set({
            title: this.state.stdtitle,
            fname: this.state.stdfname,
            lname: this.state.stdlname,
            phone: this.state.stdphone,
            email: this.state.stdemail,
        });
    }


    edit(std) {
        this.setState({
            stdid: std.id,
            stdtitle: std.title,
            stdfname: std.fname,
            stdlname: std.lname,
            stdemail: std.email,
            stdphone: std.phone,
        })
    }


    delete(std) {
        if (confirm("ต้องการลบข้อมูล")) {
            db.collection("students").doc(std.id).delete();
        }
    }

    render() {
        // var stext = JSON.stringify(this.state.students);  
        return (
            <Card>
                <Card.Header>{this.title}</Card.Header>
                <Card.Body className="content">
                    <Button onClick={() => this.readData()} style={{marginRight : 10}}>Read Data</Button>
                    <Button onClick={() => this.autoRead()}>Auto Read</Button>
                    <div className="table">
                        <StudentTable data={this.state.students} app={this} />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br />
                    <TextInput placeholder="Hello" label="ID" app={this} value="stdid" style={{ width: 120 }} />
                    <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{ width: 100, marginLeft: 10 }} />
                    <TextInput label="ชื่อ" app={this} value="stdfname" style={{ width: 120, marginLeft: 10 }} />
                    <TextInput label="สกุล" app={this} value="stdlname" style={{ width: 120, marginLeft: 10 }} />
                    <TextInput label="Email" app={this} value="stdemail" style={{ width: 150, marginLeft: 10 }} />
                    <TextInput label="Phone" app={this} value="stdphone" style={{ width: 120, marginLeft: 10 }} />
                    <Button onClick={() => this.insertData()} style={{ marginLeft: 10 }}>Save</Button>
                </Card.Footer>
                <Card.Footer>{this.footer}</Card.Footer>
            </Card>
        );
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyBHyjI7Q6liQnKq43vR44i6TXzuR4a5Yxc",
    authDomain: "web2566-9722d.firebaseapp.com",
    projectId: "web2566-9722d",
    storageBucket: "web2566-9722d.appspot.com",
    messagingSenderId: "813522963491",
    appId: "1:813522963491:web:83f0aaba85787cd88f3596",
    measurementId: "G-GFZB2J7RNK"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// db.collection("students").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} =>`, doc.data());
//     });
// });



const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);