<template>
    <div class="index">
        <div class="index-tab">
            <div class="index-tab-item">我要买币</div>
            <div class="index-tab-item active">我要卖币</div>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
    .index {
        &-tab {
            padding: 0.08rem 0 .18rem;
            display: flex;
            justify-content: center;
            font-size: $f26;
            color: $fc07;
            line-height: .56rem;
            background-color: $bg02;
        }
        &-tab-item {
            padding: 0 .5rem;
            border: 2px solid $fc07;
            &.active {
                background-color: $fc07;
                color: $fc08;
            }
        }
    }
</style>
