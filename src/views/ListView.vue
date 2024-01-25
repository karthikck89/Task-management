<script>
import { ref } from 'vue';
import { fetchTaskData, updateTaskData } from '@/api.js'
export default {
  name: "listView",
  data() {
    return {
        tasks: "",
        openTask: [],
        closedTask: [],
    }
  },
mounted() {
    this.getTask();
  },
  methods: {
     async updateTask(id, data) {
        const updateVal=  await updateTaskData(id, data);
        if(updateVal) {
            this.getTask();
        }
    },
    async getTask() {
        this.tasks = await fetchTaskData();
        this.openTask = [];
        this.closedTask = [];
        this.tasks.filter(data => {
        data.status === "open" ? this.openTask.push(data) : this.closedTask.push(data);
        })
    }
  }
}
</script>
<template>
    <div class="taskLists">
        <div class="open-task">
            <div class="content-box">
                <div class="title">
                    Open Tasks
                </div>
                <div class="content" v-if="this.tasks?.length === 0">There is no task tagged with <strong>Open</strong>
                </div>
                <div v-for="open in openTask" :key="open.id" class="task-array">
                    <p>{{ open.name }}</p>
                    <p>{{ open.dueDate }}</p>
                    <p><button @click="updateTask(open.id, open)">Mark as Closed</button></p>
                </div>
            </div>
        </div>
        <div class="closed-task">
            <div class="content-box">
                <div class="title">
                    Closed Tasks
            </div>
            <div class="content" v-if="this.closedTask?.length === 0">
                <div>There is no task tagged with <strong>Closed</strong></div>
            </div>
            <div v-for="open in closedTask" :key="open.id" class="task-array">
                    <p>{{ open.name }}</p>
                    <p>{{ open.dueDate }}</p>
                </div>
        </div>
    </div>
</div>
</template>
<style scoped lang="scss">
.taskLists {
    display: flex;
    align-items: stretch;
    flex-direction: row;
    .open-task {
    flex:3;
    margin:15px 0;
    @media (max-width: 700px) {
        flex:2;
    }

}
.closed-task {
    flex:2;
    margin:15px 0 15px 15px;

}
.content-box {
    display:block;
    border-radius:10px;
}
.title {
    display:flex;
    align-items:center;
    padding:15px;
    border-radius:5px;
    background: #fff;
}
.task-array {
    padding:20px 15px;
    background: #fff;
    margin-top:10px;
    display:flex;
    align-items:center;
    @media (max-width: 700px) {
            display:block;
        }
    p {
        margin:0;
        flex:1;
        @media (max-width: 700px) {
            display:block;
            margin-top:20px;
        }
        button {
            background: rgb(0, 36, 61);
            color: #fff;
            border-radius: 4px;
            padding: 7px 15px;
            cursor:pointer;
            border:0;
            &:hover {
                background: rgb(0, 61, 109);
            }
        }
    }
}
}

</style>