<template>
  <div class="todo p-3">
      <span class="text-primary">{{ title }}</span><i class="ms-auto text-primary bi bi-check-circle"></i>
  </div>
</template>

<script>
export default {
  name: 'TodoListItem',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.todo {
    background-color: #f8f9fa;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    &:not(:hover) .bi-check-circle {
      display: none;
    }
}
</style>
