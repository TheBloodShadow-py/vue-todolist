"use strict";

const { createApp } = Vue;

createApp({
  data() {
    return {
      errorStatus: false,
      taskTitleInput: "",
      taskDescriptionInput: "",
      tasksList: JSON.parse(localStorage.getItem("tasksList")) || [
        {
          taskTitle: "Sleep more :)",
          taskDescription: "sleep at least 8 hours",
          taskStatus: false,
        },
      ],
    };
  },
  methods: {
    addTask: function () {
      // Controllo se gli input sono validi
      if (
        !this.taskTitleInput ||
        this.taskTitleInput.trim().length < 3 ||
        !this.taskDescriptionInput ||
        this.taskDescriptionInput.trim().length < 3
      ) {
        this.errorStatus = true;
        return;
      } else {
        this.errorStatus = false;
        this.tasksList.unshift({
          taskTitle: this.taskTitleInput,
          taskDescription: this.taskDescriptionInput,
          taskStatus: false,
        });
        this.taskTitleInput = "";
        this.taskDescriptionInput = "";
        this.saveInStorage();
      }
    },
    deleteTask: function (index) {
      this.tasksList = this.tasksList.filter((elem, elemindex) => !(index === elemindex));
      this.saveInStorage();
    },
    changeStatus: function (index) {
      if (this.tasksList[index].taskStatus) {
        this.tasksList[index].taskStatus = false;
      } else {
        this.tasksList[index].taskStatus = true;
      }
      this.saveInStorage();
    },
    saveInStorage: function () {
      localStorage.setItem("tasksList", JSON.stringify(this.tasksList));
    },
  },
}).mount("#app");
