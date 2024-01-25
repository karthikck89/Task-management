<script>
import { postTasks } from '@/api.js'
import { Field, Form, ErrorMessage } from 'vee-validate';
import moment from 'moment';
export default {
    components: {
    Field,
    Form,
    ErrorMessage,
  },

    data() {
        return {
            taskName: "",
            dueDate: "",
            taskStatus: ""
        }
    },

    methods: {
        async onSubmit(values) {
            const postData = await postTasks(values);
            if (postData) {
                this.$router.push("/");
            }
        },
        validateName(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // if the field is not a valid name
      const regex = /^[\w\-\s]+$/;
      if (!regex.test(value)) {
        return 'Only alphanumeric characters are allowed';
      }
      // All is good
      return true;
    },
    validateDate(value) {
        if (!value) {
        return 'This field is required *';
      }
      const changeDate = value.split("-");
      const newDate = `${changeDate[2]}/${changeDate[1]}/${changeDate[0]}`;
      const futureDate = moment(newDate, "DD/MM/YYYY").isBefore(moment(new Date(), "DD/MM/YYYY"), 'day');
      if(futureDate) {
        return "Select future Dates to proceed";
      }
      return true;
    },
    validateStatus(value) {
        if (!value) {
        return 'This field is required';
      }
      return true;
    }
    }

}
</script>
<template>
    <div class="create-form">
        <div class="content-box">
            <div class="title">
                Create Form
            </div>
            <div class="card-body">
                <Form @submit="onSubmit">
                    <label for="name">Task Name</label>
                    <Field type="text" id="name" name="name" v-model="taskName" :rules="validateName" placeholder="Enter Task Name"></Field>
                    <ErrorMessage name="name" />
                    <label for="dueDate">Due Date</label>
                    <Field type="date" id="dueDate" name="dueDate" v-model="dueDate" :rules="validateDate" placeholder="Select Date"></Field>
                    <ErrorMessage name="dueDate" />
                    <label for="status">Status</label>
                    <Field id="status" name="status" v-model="taskStatus" :rules="validateStatus" as="select">
                        <option value="">Select Status</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </Field>
                    <ErrorMessage name="status" />
                    <div class="card-footer">
                <button type="submit">Save</button>
            </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.create-form {
    display: flex;
    width: 60%;
    justify-content: center;
    margin: 15px auto;

    .content-box {
        flex: 2;

        .title {
            display: flex;
            align-items: center;
            padding: 15px;
            border-radius: 5px;
            background: #fff;
        }
    }

    form {
        width: 100%;
        background: #fff;
        margin-top: 15px;

        label {
            display: block;
        }
    }
    .card-body {
  padding-bottom: 0;
  display:flex;
}

form {
  display: flex;
  flex-direction: column;
  padding:15px;
  span {
    color: red;
    display: block;
    margin-bottom: 16px;
  }
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
select {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.card-footer {
  text-align: left;
  background:#fff;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
  background-color: #45a049;
}
}

}</style>