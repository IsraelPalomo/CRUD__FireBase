import { createStore } from "vuex";
import router from "../router";

export default createStore({
	state: {
		tarea: {
			id: "",
			nombre: "",
			lenguaje: "",
			numero: "",
			importancia: "",
		},
		tareas: [],
	},
	mutations: {
		pushTarea(state, payload) {
			state.tareas.push(payload);
		},
		deleteTarea(state, payload) {
			state.tareas = state.tareas.filter((item) => item.id !== payload);
		},
		setTarea(state, payload) {
			state.tarea = state.tareas.find((item) => item.id === payload);
		},
		updateTarea(state, payload) {
			state.tareas = state.tareas.map((item) => (item.id === payload.id ? payload : item));
		},
		cargar(state, payload) {
			state.tareas = payload;
		},
	},
	actions: {
		async pushTareas({ commit }, tarea) {
			try {
				const res = await fetch(
					`https://apifirebase-e41b5-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(tarea),
					}
				);
				const data = await res.json();
				console.log(data);
			} catch (error) {
				console.log(error);
			}
			commit("pushTarea", tarea);
		},
		async deleteTareas({ commit }, id) {
			try {
				await fetch(`https://apifirebase-e41b5-default-rtdb.firebaseio.com/tareas/${id}.json`, {
					method: "DELETE",
				});
			} catch (error) {
				console.log(error);
			}
			commit("deleteTarea", id);
		},
		setTareas({ commit }, id) {
			commit("setTarea", id);
		},
		async updateTareas({ commit }, tarea) {
			try {
				const res = await fetch(
					`https://apifirebase-e41b5-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,
					{
						method: "PATCH",
						body: JSON.stringify(tarea),
					}
				);
				const data = await res.json();
				commit("updateTarea", data);
				router.push("/");
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		},
		async cargarFirebase({ commit }) {
			try {
				const res = await fetch(
					"https://apifirebase-e41b5-default-rtdb.firebaseio.com/tareas.json"
				);
				const data = await res.json();
				const arrayTareas = [];

				for (const id in data) {
					arrayTareas.push(data[id]);
				}
				console.log(arrayTareas);
				commit("cargar", arrayTareas);
			} catch (error) {
				console.log(error);
			}
		},
	},
	modules: {},
});
