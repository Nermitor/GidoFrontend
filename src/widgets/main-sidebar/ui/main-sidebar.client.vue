<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-sub-menu index="1">
      <template #title> Воркспейсы </template>
      <el-menu-item index="1-1">
        <NuxtLink to="/space/1">Ворк 1</NuxtLink>
      </el-menu-item>
      <el-menu-item index="1-2">
        <NuxtLink to="/space/2">Ворк 2</NuxtLink>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title> Наборы </template>
      <el-menu-item index="2-1"><NuxtLink>Флажки</NuxtLink></el-menu-item>
      <el-menu-item index="2-2">Права доступа</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
