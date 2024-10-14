import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://website-tracker-e7fbd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referDB = ref(database,"websites")

const inputEl = document.getElementById("data")
const saveButton = document.getElementById("save-input")
const listUn=document.getElementById("list-ul")
const delBtn=document.getElementById("del")

function render(arr) {
    let lists=""    
    for(let i=0; i<arr.length; i++) {
        lists+=`<li>
                    <a href='${arr[i]}' target='_blank'>                    
                        ${arr[i]}                    
                    </a>
                </li>`
    }
    listUn.innerHTML=lists
}

delBtn.addEventListener("dblclick", function() {
    remove(referDB)
    listUn.innerHTML=""   
})

onValue(referDB, function(snapshot) {
    const snapshotExist=snapshot.exists()
    if(snapshotExist) {
        const snaps=snapshot.val()
        const leads=Object.values(snaps)
        render(leads)

    }
})

saveButton.addEventListener("click", function() {
    inputEl.value
    push(referDB, inputEl.value)
    inputEl.value=""
})






