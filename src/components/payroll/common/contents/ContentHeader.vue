<template>
    <div class="content-header">
        <div class="header-bottom">
            <div class="header-bottom-left">
                <div class="menu-box">
                    <div class="menu-item title">
                        <div class="menu-item-icon">
                            <i class="icon-imageIcon-lnb-view-all-active">
                                <span class="blind">{{title}}</span>
                            </i>
                        </div>
                        <h1 class="menu-text"
                            data-toggle="tooltip"
                            data-placement="bottom_left"
                            data-animation="false"
                            :data-original-title="title">{{title}}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ContentHeader',
        props: {
            title: String
        }
    }
</script>
