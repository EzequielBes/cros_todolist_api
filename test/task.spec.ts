import { MainTask, SubTask } from "../src/tasks/task";

describe('Name of the group', () => {
    test('deve criar uma task com uma subtask',()=>{
        const task = new MainTask("1","zzid","fazer cafe","faça cafe para o guina","cafe",null,true,[])
        task.addSubtask(new SubTask("subtaskId1","1","fazer cafe","faça cafe para o guina","cafe",null,true,[]))
        expect(task.subtasks.length).toBe(1)
    })

    test('deve criar uma task com uma subtask com uma subtask',()=>{
        const task = new MainTask("1","zzid","fazer cafe","faça cafe para o guina","cafe",null,true,[])
        const subtask1 = new SubTask("subtaskId1","1","fazer cafe","faça cafe para o guina","cafe",null,true,[])
        subtask1.addSubtask(new SubTask("subtaskId2","subtaskId1","fazer cafe","faça cafe para o guina","cafe",null,true,[]))
        task.addSubtask(subtask1)
        console.log(task)
        expect(task.subtasks.length).toBe(1)
        expect(task.subtasks[0].subtasks.length).toBe(1)
    })
});
