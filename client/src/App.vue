<template>
  <v-app>
    <v-main class="app-main">
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-main { min-height: 100vh; }

/* Simple fade + slight slide for route changes */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity .18s ease, transform .18s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>