<template>
    <div>
        组件：SlotNav
       <slot name="header" :user="user">
            <div>
                <span>这是用户的名字：{{user.name}}</span>
            </div>
        </slot> 
    </div>
</template>
<script>
export default {
    data(){
        return {
            user: {
                name: '李钟'
            }
        }
    }  
}
</script>