<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getRecipeById, updateRecipe } from "../services/api";

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);

const name = ref("");
const description = ref("");
const steps = ref("");
const time = ref<number | null>(null);
const ingredients = ref("");

const loading = ref(true);

const loadRecipe = async () => {
  loading.value = true;
  const res = await getRecipeById(id);
  const data = res;
  if (data) {
    name.value = data.name;
    description.value = data.description;
    steps.value = data.steps;
    time.value = data.time_minutes;
    ingredients.value = data.ingredients.map((i: any) => i.name).join(", ");
  } else {
    alert("Receta no encontrada");
    router.push("/");
  }
  loading.value = false;
};

const submitForm = async () => {
  if (!name.value || !description.value) {
    alert("Nombre y descripción son obligatorios");
    return;
  }

  const ingArray = ingredients.value
    .split(",")
    .map((i) => i.trim())
    .filter((i) => i.length > 0);

  const recipeData = {
    name: name.value,
    description: description.value,
    steps: steps.value,
    time_minutes: time.value,
    ingredients: ingArray,
  };

  const res = await updateRecipe(id, recipeData);

  if (res.id) {
    alert("Receta actualizada con éxito");
    router.push(`/recipe/${id}`);
  } else {
    alert("Error actualizando receta");
  }
};

onMounted(() => {
  loadRecipe();
});
</script>

<template>
  <div class="container" v-if="!loading">
    <h1>Editar receta</h1>

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

      <button type="submit">Actualizar</button>
    </form>
  </div>

  <div v-else>
    Cargando datos de la receta...
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

