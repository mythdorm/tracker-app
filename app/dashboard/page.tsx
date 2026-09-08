import { logout } from "@/app/actions/auth";
import TopNav from "@/app/ui/topnav";
// import Popup from "@/app/ui/popup";
// import { TaskForm } from "@/app/ui/task-form";
// import { getTasks, Task } from "../actions/tasks";
import TaskList from "../ui/task-list";
import TaskPopup from "../ui/task-popup";
// Shows up at localhost:3000/dashboard


export default async function Page () {
    return (
        <main className="">
            <div className="w-full">
                <TopNav />
                <div className="py-10">
                    <button onClick={logout}>Logout</button>
                </div>
                
                <TaskList />
                
            </div>
        </main>
    )
}