<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getRecipeById } from "../services/api";

const route = useRoute();
const router = useRouter();

const recipe = ref<any>(null);
const loading = ref(true);

const loadRecipe = async () => {
  loading.value = true;
  const id = Number(route.params.id);
  const res = await getRecipeById(id);
  recipe.value = res || null;
  loading.value = false;
};

onMounted(() => {
  loadRecipe();
});

const goBack = () => router.push("/");
const goEdit = () => router.push(`/edit/${recipe.value.id}`);
</script>

<template>
  <div class="container" v-if="!loading && recipe">
    <h1>{{ recipe.name }}</h1>
    <p><strong>Descripción:</strong> {{ recipe.description }}</p>
    <p v-if="recipe.steps"><strong>Pasos:</strong> {{ recipe.steps }}</p>
    <p><strong>Tiempo:</strong> {{ recipe.time_minutes }} min</p>

    <p><strong>Ingredientes:</strong>
      <span v-for="(ing, index) in recipe.ingredients" :key="ing.id">
        {{ ing.name }}<span v-if="index < recipe.ingredients.length - 1">, </span>
      </span>
    </p>

    <div class="buttons">
      <button @click="goEdit">✏ Editar</button>
      <button @click="goBack">⬅ Volver</button>
    </div>
  </div>

  <div v-else-if="loading">
    Cargando receta...
  </div>

  <div v-else>
    Receta no encontrada.
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

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>


