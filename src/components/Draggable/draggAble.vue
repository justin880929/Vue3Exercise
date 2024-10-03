<template>
  <div class="draggable-container">
    <div class="containerA">
      <input v-model="keywords1" type="search" placeholder="Search Box"/>
      <VueDraggable
        class="container-ch"
        v-model="filterList1"
        animation="150"
        ghostClass="ghost"
        group="people"
        @update="onUpdate"
        @add="addBToA($event)"
      >
      <div
        v-for="item in filterList1"
        :key="item.id"
        class="item-container"
      >
        <input type="checkbox" class="checkbox" :id="item.id" v-model="item.check" >
        {{ item.name }}
      </div>
    </VueDraggable>
    </div>
    <button @click="transfer" class="item-container">
      <i class='bx bx-transfer-alt'></i>
    </button>
    <div class="containerB">
      <input v-model="keywords2" type="search" placeholder="Search Box"/>
      <VueDraggable
        class="container-ch"
        v-model="filterList2"
        animation="150"
        group="people"
        ghostClass="ghost"
        @update="onUpdate"
        @add="addAToB($event)"
      >
      <div
        v-for="item in filterList2"
        :key="item.id"
        class="item-container"
      >
        <input type="checkbox" class="checkbox" :id="item.id" v-model="item.check">
        {{ item.name }}
      </div>
      </VueDraggable>
    </div>
  </div>
</template>

<script setup>
import { ref,watch} from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { createRegex } from "../Form/createRegex";
const keywords1=ref("");
const keywords2=ref("");
watch(() => keywords1.value, (val) => {
  keywords1.value = val.replace(createRegex("sEng", "num"), "");
});
watch(() => keywords2.value, (val) => {
  keywords2.value = val.replace(createRegex("sEng", "num"), "");
});
const list1 = ref(
  [
    {
      name:'item1',
      id:'1',
      check:false
    },
    {
      name:'item2',
      id:'2',
      check:false
    },
    {
      name:'item3',
      id:'3',
      check:false
    },
    {
      name:'item4',
      id:'4',
      check:false
    },
    {
      name:'item5',
      id:'5',
      check:false
    }
  ]
  );
const list2 = ref(
  [
    {
      name:'item6',
      id:'6',
      check:false
    },
    {
      name:'item7',
      id:'7',
      check:false
    }
  ]
)
const filterList1 = ref([]);
const filterList2 = ref([]);
watch(keywords1, (newKeywords) => {
  if (newKeywords === '') {
    filterList1.value = [...list1.value]; // 當關鍵字為空時，返回原始列表
  } else {
    filterList1.value = list1.value.filter(item =>
      item.name.toLowerCase().includes(newKeywords.toLowerCase()) // 過濾符合關鍵字的項目
    );
    console.log("filterList1");
    console.log(filterList1.value);
  }
}, { immediate: true });
watch(keywords2, (newKeywords) => {
  if (newKeywords === '') {
    filterList2.value = [...list2.value]; // 當關鍵字為空時，返回原始列表
  } else {
    filterList2.value = list2.value.filter(item =>
      item.name.toLowerCase().includes(newKeywords.toLowerCase()) // 過濾符合關鍵字的項目
    );
    console.log("filterList2");
    console.log(filterList2.value);
  }
}, { immediate: true });
function transfer(){
  console.log("transfer被調用");
    let itemTrasfer1=list1.value.filter(item => item.check===true);
    let itemTrasfer2=list2.value.filter(item => item.check===true);
    itemTrasfer1.forEach(item => {
      const newItem = { ...item, check: false }; 
      list2.value.push(newItem);
    });
    itemTrasfer2.forEach(item => {
      const newItem = { ...item, check: false }; 
      list1.value.push(newItem);
    });
    
    console.log(list1.value);
    console.log(list2.value);
    list1.value=list1.value.filter(item=>item.check===false);
    filterList1.value = [...list1.value];
    list2.value=list2.value.filter(item=>item.check===false);
    filterList2.value = [...list2.value];
}

function onUpdate() {
  console.log('update')
}
function addAToB($event) {
  let newItem = list1.value.find(item =>
    item.id.toLowerCase() === $event.data.id.toLowerCase()
  );
  if (newItem) {
    list2.value.splice($event.newIndex, 0, newItem);
    filterList2.value = [...list2.value];
    list1.value = list1.value.filter(item => item.id !== newItem.id);
    console.log('Added item to B:', newItem);
    console.log('after A TO B list1');
    console.log(list1.value);
    console.log('after A TO B list2');
    console.log(list2.value);
  } else {
    console.error('Item not found in list1');
  }
}

function addBToA($event) {
  let newItem = list2.value.find(item =>
    item.id.toLowerCase() === $event.data.id.toLowerCase() 
  );
  if (newItem) {
    list1.value.splice($event.newIndex, 0, newItem);
    filterList1.value = [...list1.value];
    list2.value = list2.value.filter(item => item.id !== newItem.id);
    console.log('Added item to A:', newItem);
    console.log('after B to A list1');
    console.log(list1.value);
    console.log('after B to A list2');
    console.log(list2.value);
  } else {
    console.error('Item not found in list2');
  }
}
</script>
<style scoped lang="scss">
.draggable-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  height: 300px;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
input{
  width: 100%;
  height: 30px;
  border: black 1px solid;
  border-radius: 5px;
}
button{
  border: transparent;
}
.checkbox{
  width: 15px;
  height: 15px;
  color: black;
}
.containerA, .containerB {
  background-color: #ffffff;
  width: 40%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  overflow-y: auto;
  &:hover {
    background-color: #f9fafc;
  }
  .container-ch{
    width: 100%;
    min-width: 100%;
    min-height: 200px;
  }
}

.item-container {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
}

.ghost {
  opacity: 0.5;
}

</style>
