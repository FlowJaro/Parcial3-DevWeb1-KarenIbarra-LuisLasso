<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createRecipe } from "../services/api";

const router = useRouter();

const name = ref("");
const description = ref("");
const steps = ref("");
const time = ref<number | null>(null);
const ingredients = ref("");

const submitForm = async () => {
  try {
    const ingArray = ingredients.value
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i.length > 0)
      .map((i) => ({ name: i }));

    const recipeData = {
      name: name.value,
      description: description.value,
      steps: steps.value,
      time_minutes: time.value,
      ingredients: ingArray,
    };

    const res = await createRecipe(recipeData);

    // si llega aquí → NO hubo error
    alert("Receta creada con éxito");
    router.push("/");
  } catch (error) {
    alert("Error creando receta");
  }
};
</script>

<template>
  <div class="container">
    <h1>Crear nueva receta</h1>

    <form @submit.prevent="submitForm">
      <label>Nombre:</label>
      <input v-model="name" required />

      <label>Descripción:</label>
      <textarea v-model="description" required />

      <label>Pasos:</label>
      <textarea v-model="steps" />

      <label>Tiempo (min):</label>
      <input type="number" v-model="time" min="1" />

      <label>Ingredientes (separados por coma):</label>
      <input v-model="ingredients" placeholder="Tomate, Sal, Pollo" />

      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
}
</style>
