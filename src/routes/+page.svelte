<script>
    import { onMount } from 'svelte';
    import jQuery from 'jquery';
    import {packets} from '../data.js';

    // Heights and widths as percentages
    let leftWidth = 50; // Width of the left container
    let rightWidth = 50; // Width of the right container
    let topHeight = 50; // Height of the top container
    let bottomHeight = 50; // Height of the bottom row

    let isDraggingHeight = false; // For resizing heights (up and down)
    let isDraggingWidth = false; // For resizing widths (left and right)

    // Reiszing Heights (Horizontal Resizer)
    const startDragHeight = () => (isDraggingHeight = true);
    const stopDragHeight = () => (isDraggingHeight = false);

    const onDragHeight = (event) =>
    {
        if (!isDraggingHeight) return;

        const totalHeight = window.innerHeight; // Total height of the viewport
        const mouseY = event.clientY;

        const newTopHeight = (mouseY / totalHeight) * 100;
        const newBottomHeight = 100 - newTopHeight;

        if (newTopHeight >= 10 && newBottomHeight >= 10)
        {
            topHeight = newTopHeight;
            bottomHeight = newBottomHeight;
        }
    };

    // Resizing Widths  (Vertical Resizer)
    const startDragWidth = () => (isDraggingWidth = true);
    const stopDragWidth = () => (isDraggingWidth = false);

    const onDragWidth = (event) =>
    {
        if (!isDraggingWidth) return;

        const totalWidth = document.body.offsetWidth; // Total width of the viewport
        const mouseX = event.clientX;

        const newLeftWidth = (mouseX / totalWidth) * 100;
        const newRightWidth = 100 - newLeftWidth;

        if (newLeftWidth >= 10 && newRightWidth >= 10)
            {
                leftWidth = newLeftWidth;
                rightWidth = newRightWidth;
            }
    };

    onMount(() =>
    {
        window.addEventListener('mousemove', onDragHeight);
        window.addEventListener('mouseup', stopDragHeight);
        window.addEventListener('mousemove', onDragWidth);
        window.addEventListener('mouseup', stopDragWidth);
    });

    let running = false; // are packets being sniffed?
    let bColor = "#4caf50"; // background color for the sniffed packets section
    let sniffButtonLabel = "Sniff Packets";
    let cancel = false; // should we cancel the packet sniffing?
    let filter = ""

    $: if (running == true){
        bColor = "#e17878";
        sniffButtonLabel = "Stop Sniffing Packets";
    }

    $: if (running == false){
        bColor = "#4caf50";
        sniffButtonLabel = "Sniff Packets";
    }

    function sniffPacket(i){
        const individualFilters = filter.split(" && ");
        let matchesFilters = true;
        if (filter !== ""){
            for (let j = 0; j < individualFilters.length; j++){
                if (individualFilters[j] === ((i+1)+"") || individualFilters[j] === packets.application[i].timeCaptured || individualFilters[j] === packets.application[i].transport[0].network[0].source || individualFilters[j] === packets.application[i].transport[0].network[0].destination || individualFilters[j] === packets.application[i].protocol || individualFilters[j] === packets.application[i].transport[0].network[0].dataLink[0].physical[0].frameLength || individualFilters[j] === packets.application[i].method){

                }
                else{
                    matchesFilters = false;
                    break;
                }   
            }
        }
        if (matchesFilters == true){
            jQuery("#sniffedPackets").prepend("<tr><td>" + (i+1) + "</td><td>" + packets.application[i].timeCaptured + "</td><td>" + packets.application[i].transport[0].network[0].source + "</td><td>" + packets.application[i].transport[0].network[0].destination + "</td><td>" + packets.application[i].protocol + "</td><td>" + packets.application[i].transport[0].network[0].dataLink[0].physical[0].frameLength + "</td><td>" + packets.application[i].method + "</td></tr>");
        }
    }

    function runWireshark(){
        if (running == true){
            cancel = true;
            setTimeout(function() { running = false; cancel = false; }, 1000);
            // might need to adjust depending on size of data file
        }
        else{
            running = true;
            let numPackets = Object.keys(packets.application).length;
            for (let i = 0; i < numPackets; i++) {
                setTimeout(function() { if (!cancel) {sniffPacket(i)} }, 500 * i);
            }
            setTimeout(function() { running = false; }, 500 * (numPackets-1));
        }
    }
    
    function setFilter(){
        filter = document.getElementById("filter").value;
    }

    function removeFilter(){
        filter = "";
    }

    function resetPackets(){
        jQuery("#sniffedPackets").empty();
    }
</script>
  
<div class="container">
    <!-- Options Section -->
    <div class="options-bar">
        <button on:click={runWireshark}> {sniffButtonLabel}</button>
        <input type="text" id="filter"/>
        <button on:click={setFilter}> Set Filter</button>
        <button on:click={removeFilter}> Remove Filter</button>
        <button on:click={resetPackets}> Reset Packets</button>
    </div>
    <!-- Top Container -->
    <div class="large-container" style="height: {topHeight}%; background-color: {bColor}; overflow-y:scroll;">
        <table id="packets">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Time</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Protocol</th>
                    <th>Length</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody id="sniffedPackets">
            </tbody>
        </table>
    </div>

    <!-- Horizontal Resizer (Height Adjuster) -->
    <div
        class="horizontal-resizer"
        role="separator"
        aria-valuemin="10"
        aria-valuemax="90"
        aria-valuenow="{topHeight}"
        aria-orientation="horizontal"
        tabindex="0"
        on:mousedown={startDragHeight}>
    </div>

    <!-- Bottom Row -->
    <div class="bottom-row" style="height: {bottomHeight}%; background-color: #f1f1f1;">

        <!-- Bottom Left Container with Nested Containers -->
        <div class="small-container" style="width: {leftWidth}%; background-color: #2196f3;">
            <div class="nested-container level-1">
                Level 1
                <div class="nested-container level-2">
                    Level 2
                    <div class="nested-container level-3">
                        Level 3
                        <div class="nested-container level-4">
                            Level 4
                            <div class="nested-container level-5">
                                Level 5
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Vertical Resizer (Width Adjuster) -->
        <div
            class="vertical-resizer"
            role="separator"
            aria-valuemin="10"
            aria-valuemax="90"
            aria-valuenow="{leftWidth}"
            aria-orientation="vertical"
            tabindex="0"
            on:mousedown={startDragWidth}
            style="left: {leftWidth}%;">
        </div>

        <!-- Bottom Right Container -->
        <div class="small-container" style="width: {rightWidth}%; background-color: #ff9800;">
            Hex Container ({Math.round(rightWidth)}%)
        </div>
    </div>
</div>
  
<style>
    .container
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        outline: 10px solid black; 
    }

    .options-bar
    {
        width: 100%;
        height: 4%;
        background-color: #333;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        border-bottom: 10px solid black; /* Add a bottom outline */
    }

    .large-container
    {
        width: 100%;
        /*display: flex;*/
        align-items: center;
        justify-content: center;
        color: white;
        outline: #000;
        font-size: 1.5rem;
    }

    table
    {
        width: 100%;
    }

    th
    {
        border: 2px solid black;
    }

    .bottom-row
    {
        display: flex;
        width: 100%;
        position: relative;
    }

    .small-container
    {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        overflow: hidden;
    }

    .nested-container
    {
        width: 80%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.8rem;
        border: 2px solid white;
    }

    .level-1
    {
        background-color: #f44336;
    }

    .level-2
    {
        background-color: #e91e63;
    }

    .level-3
    {
        background-color: #9c27b0;
    }

    .level-4
    {
        background-color: #673ab7;
    }

    .level-5
    {
        background-color: #3f51b5;
    }

    /* Horizontal Resizer (Height Adjuster) */
    .horizontal-resizer
    {
        height: 10px;
        background-color: #000;
        cursor: ns-resize;
        width: 100%;
        z-index: 1;
        position: relative;
    }

    .horizontal-resizer:hover
    {
        background-color: #555;
    }

    /* Vertical Resizer (Width Adjuster) */
    .vertical-resizer
    {
        width: 10px;
        background-color: #000;
        cursor: ew-resize;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
    }

    .vertical-resizer:hover
    {
        background-color: #555;
    }
</style>
