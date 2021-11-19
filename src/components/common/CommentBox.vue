<template>
<div class="tbl-wrap type2" style="overflow: visible;">
    <table class="tbl tbl-type3 dropScroll">
        <colgroup>
            <col style="width: 100%">
        </colgroup>
        <tbody>
            <tr
            v-for="(item, index) in list"
            :key="index"
            >
                <th>
                    <div class="th-box" style="text-align: left;">
                        <span class="th-text" style="font-weight: normal;" 
                        :style="{color: (item.color ? item.color : 'rgba(0,0,0,0.87)')}">
                            {{ item.text }}
                        </span>
                    </div>   
                </th>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        }
    }
}
</script>
