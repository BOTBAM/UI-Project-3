<script>
    import { onMount } from "svelte";
    import jQuery from "jquery";
    import { packets } from "../data.js";

    import open_hex from "../assets/open_hex.svg";

    // Importing sample data
    import sampleData from '$lib/sampleData.json'; 

    $: if (running == true)
    {
        bColor = "#b8ffa7";
        sniffButtonLabel = "Stop Sniffing Packets";
    }
    else
    {
        bColor = "#ffffff";
        sniffButtonLabel = "Sniff Packets";
    }

    // Heights and widths as percentages
    let leftWidth = 100; // Width of the left container
    let rightWidth = 0; // Width of the right container
    let topHeight = 50; // Height of the top container
    let bottomHeight = 50; // Height of the bottom row


    let isDraggingHeight = false; // For resizing heights (up and down)
    let isDraggingWidth = false; // For resizing widths (left and right)


    let hexContainer;
    let running = false; // are packets being sniffed?
    let bColor = "#ffffff"; // background color for the sniffed packets section
    let sniffButtonLabel = "Sniff Packets";
    let cancel = false; // should we cancel the packet sniffing?
    let filter = ""; // filter the user can set to display certain packets
    let allPackets = []; // contains all packets sniffed
    let packetsDisplayed = 0;


    // Expand/Collapse logic
    let collapsed =
    {
        application: true,
        transport: true,
        network: true,
        link: true,
    };

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

    const adjustHeight = (event) =>
    {
        if (event.key === "ArrowUp")
        {
            const newTopHeight = Math.min(90, topHeight - 1);
            const newBottomHeight = 100 - newTopHeight;
            if (newBottomHeight >= 10)
            {
                topHeight = newTopHeight;
                bottomHeight = newBottomHeight;
            }
        }
        else if (event.key === "ArrowDown")
        {
            const newTopHeight = Math.max(10, topHeight + 1);
            const newBottomHeight = 100 - newTopHeight;
            if (newBottomHeight >= 10)
            {
                topHeight = newTopHeight;
                bottomHeight = newBottomHeight;
            }
        }
    };


    // Resizing Widths  (Vertical Resizer)
    const startDragWidth = () => (isDraggingWidth = true);
    const stopDragWidth = () => (isDraggingWidth = false);

    const onDragWidth = (event) =>
    {
        if (!isDraggingWidth) return;
        const totalWidth = document.body.offsetWidth;
        const mouseX = event.clientX;
        const newLeftWidth = (mouseX / totalWidth) * 100;
        const newRightWidth = 100 - newLeftWidth;
        if (newLeftWidth >= 10 && newRightWidth >= 10)
        {
            leftWidth = newLeftWidth;
            rightWidth = newRightWidth;
        }
    };
    // Added keyboard controll of the adjustable separators for user-friendlyness and A11y
    const adjustWidth = (event) =>
    {
        if (event.key === "ArrowLeft")
        {
            const newLeftWidth = Math.max(10, leftWidth - 1);
            const newRightWidth = 100 - newLeftWidth;
            if (newRightWidth >= 10) {
                leftWidth = newLeftWidth;
                rightWidth = newRightWidth;
            }
        } 
        else if (event.key === "ArrowRight")
        {
            const newLeftWidth = Math.min(90, leftWidth + 1);
            const newRightWidth = 100 - newLeftWidth;
            if (newRightWidth >= 10)
            {
                leftWidth = newLeftWidth;
                rightWidth = newRightWidth;
            }
        } 
    };

    const openHex = (event) => {
        rightWidth = 35;
        leftWidth = leftWidth - rightWidth;
    };

    const generateHexView = (length) => {
        if (!hexContainer) return;
        hexContainer.innerHTML = "";

        const table = document.createElement("table");
        table.className = "hex-table";

        // headers
        const headerRow = document.createElement("tr");
        const offsetHeader = document.createElement("th");
        offsetHeader.textContent = "Offset";
        headerRow.appendChild(offsetHeader);

        const hexHeader = document.createElement("th");
        hexHeader.textContent = "Hex Values";
        hexHeader.className = "hex-values-header";
        headerRow.appendChild(hexHeader);

        const asciiHeader = document.createElement("th");
        asciiHeader.textContent = "ASCII";
        headerRow.appendChild(asciiHeader);

        table.appendChild(headerRow);

        // data rows
        for (let offset = 0; offset < length; offset += 16) {
            const row = document.createElement("tr");

            // offset column
            const offsetCell = document.createElement("td");
            offsetCell.className = "hex-offset";
            offsetCell.textContent = offset.toString(16).padStart(8, "0");
            row.appendChild(offsetCell);

            // hex values
            const hexCell = document.createElement("td");
            hexCell.className = "hex-values";

            // ascii
            const asciiCell = document.createElement("td");
            asciiCell.className = "hex-ascii";

            let hexContent = "";
            let asciiContent = "";

            for (let i = 0; i < 16 && offset + i < length; i++) {
                const byte = Math.floor(Math.random() * 256);

                // add hex
                hexContent += byte.toString(16).padStart(2, "0") + " ";
                // extra space after 8 bytes
                if (i === 7) hexContent += " ";

                // add ascii
                asciiContent +=
                    byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : ".";
            }

            hexCell.textContent = hexContent;
            asciiCell.textContent = asciiContent;

            row.appendChild(hexCell);
            row.appendChild(asciiCell);
            table.appendChild(row);
        }

        hexContainer.appendChild(table);
    };

    onMount(() => {
        window.addEventListener("mousemove", onDragHeight);
        window.addEventListener("mouseup", stopDragHeight);
        window.addEventListener("mousemove", onDragWidth);
        window.addEventListener("mouseup", stopDragWidth);
    });



    function toggleCollapse(layer)
    {
        collapsed[layer] = !collapsed[layer];
    }

    function toggleAll()
    {
        const anyExpanded = Object.values(collapsed).some(state => !state);
        for (let key in collapsed)
        {
            collapsed[key] = anyExpanded;
        }
    }

    // Sequential Fade-in Logic
    function fadeInLayers()
    {
        const layers = ['application', 'transport', 'network', 'link'];
        layers.forEach((layer, index) =>
        {
            setTimeout(() =>
            {
                document.getElementById(`${layer}-layer`).style.opacity = 1;
            }, index * 500);
        });
    }





    function sniffPacket(i)
    {
        const individualFilters = filter.split(" && ");
        let matchesFilters = true;
        allPackets.push([
            i + 1 + "",
            packets.application[i].timeCaptured,
            packets.application[i].transport[0].network[0].source,
            packets.application[i].transport[0].network[0].destination,
            packets.application[i].protocol,
            packets.application[i].transport[0].network[0].dataLink[0]
                .physical[0].frameLength,
            packets.application[i].method,
        ]);
        if (filter !== "") {
            for (let j = 0; j < individualFilters.length; j++) {
                if (
                    individualFilters[j] === i + 1 + "" ||
                    individualFilters[j] ===
                        packets.application[i].timeCaptured ||
                    individualFilters[j] ===
                        packets.application[i].transport[0].network[0].source ||
                    individualFilters[j] ===
                        packets.application[i].transport[0].network[0]
                            .destination ||
                    individualFilters[j] === packets.application[i].protocol ||
                    individualFilters[j] ===
                        packets.application[i].transport[0].network[0]
                            .dataLink[0].physical[0].frameLength ||
                    individualFilters[j] === packets.application[i].method
                )
                {
                }
                else
                {
                    matchesFilters = false;
                    break;
                }
                }
            }
        if (matchesFilters == true) {
            if (packetsDisplayed == 0){
                jQuery("#sniffedPackets").empty();
            }
            jQuery("#sniffedPackets").prepend(
                "<tr><td>" +
                    (i + 1) +
                    "</td><td>" +
                    packets.application[i].timeCaptured +
                    "</td><td>" +
                    packets.application[i].transport[0].network[0].source +
                    "</td><td>" +
                    packets.application[i].transport[0].network[0].destination +
                    "</td><td>" +
                    packets.application[i].protocol +
                    "</td><td>" +
                    packets.application[i].transport[0].network[0].dataLink[0]
                        .physical[0].frameLength +
                    "</td><td>" +
                    packets.application[i].method +
                    "</td></tr>",
            );
            packetsDisplayed += 1;
        }
    
    };
    function runWireshark() {
        if (running) {
            cancel = true;
            setTimeout(function () {
                running = false;
                cancel = false;
            }, 1000);
            // might need to adjust depending on size of data file
        } else {
            running = true;
            fadeInLayers(); // Integrate fade-in logic
            let numPackets = Object.keys(packets.application).length;
            for (let i = 0; i < numPackets; i++) {
                setTimeout(function () {
                    if (!cancel) {
                        sniffPacket(i);
                    }
                }, 100 * i);
            }
            setTimeout(
                function () {
                    running = false;
                },
                100 * (numPackets - 1),
            );
        }
    }

    function setFilter() {
        filter = document.getElementById("filter").value;
        const individualFilters = filter.split(" && ");
        jQuery("#sniffedPackets").empty();
        packetsDisplayed = 0;
        if (filter !== "") {
            for (let m = 0; m < allPackets.length; m++) {
                let matchesFilters = true;
                for (let j = 0; j < individualFilters.length; j++) {
                    if (
                        individualFilters[j] === allPackets[m][0] ||
                        individualFilters[j] === allPackets[m][1] ||
                        individualFilters[j] === allPackets[m][2] ||
                        individualFilters[j] === allPackets[m][3] ||
                        individualFilters[j] === allPackets[m][4] ||
                        individualFilters[j] === allPackets[m][5] ||
                        individualFilters[j] === allPackets[m][6]
                    ) {
                    } else {
                        matchesFilters = false;
                        break;
                    }
                }
                if (matchesFilters) {
                    jQuery("#sniffedPackets").prepend(
                        "<tr><td>" +
                        allPackets[m][0] +
                        "</td><td>" +
                        allPackets[m][1] +
                        "</td><td>" +
                        allPackets[m][2] +
                        "</td><td>" +
                        allPackets[m][3] +
                        "</td><td>" +
                        allPackets[m][4] +
                        "</td><td>" +
                        allPackets[m][5] +
                        "</td><td>" +
                        allPackets[m][6] +
                        "</td></tr>"
                    );
                    packetsDisplayed += 1;
                }
            }
            if (packetsDisplayed == 0) {
                jQuery("#sniffedPackets").prepend(
                    "<tr><td></td><td></td><td></td><td>No packets match the filter!</td></tr>",
                );
            }
        } else {
            for (let k = 0; k < allPackets.length; k++) {
                jQuery("#sniffedPackets").prepend(
                    "<tr><td>" +
                        allPackets[k][0] +
                        "</td><td>" +
                        allPackets[k][1] +
                        "</td><td>" +
                        allPackets[k][2] +
                        "</td><td>" +
                        allPackets[k][3] +
                        "</td><td>" +
                        allPackets[k][4] +
                        "</td><td>" +
                        allPackets[k][5] +
                        "</td><td>" +
                        allPackets[k][6] +
                        "</td></tr>",
                );
                packetsDisplayed += 1;
            }
        }
    }

    function removeFilter() {
        filter = "";
        jQuery("#sniffedPackets").empty();
        packetsDisplayed = 0;
        for (let k = 0; k < allPackets.length; k++) {
            jQuery("#sniffedPackets").prepend(
                "<tr><td>" +
                allPackets[k][0] +
                "</td><td>" +
                allPackets[k][1] +
                "</td><td>" +
                allPackets[k][2] +
                "</td><td>" +
                allPackets[k][3] +
                "</td><td>" +
                allPackets[k][4] +
                "</td><td>" +
                allPackets[k][5] +
                "</td><td>" +
                allPackets[k][6] +
                "</td></tr>"
            );
            packetsDisplayed += 1;
        }
    }

    function resetPackets() {
        if(packetsDisplayed != 0){
            jQuery("#sniffedPackets").empty();
            packetsDisplayed = 0;
        }
        allPackets = [];
    }

    $: if (rightWidth < 11) {
        rightWidth = 0;
        leftWidth = 100;
    }

    $: if (hexContainer) {
        generateHexView(357);
    }
</script>

<div class="container">
    <!-- Options Section -->
    <div class="options-bar">
        <button class="options" id="sniffButton" on:click={runWireshark}> {sniffButtonLabel}</button>
        <button class="options" id = "reset" on:click={resetPackets}> Reset Packets</button>
        <button class="options" id="removeFilter" on:click={removeFilter}> Remove Filter</button>
        <p id="displayedFilter">Filter: {filter}</p>
        <input type="text" id="filter"/>
        <button class="options" id="setFilter" on:click={setFilter}> Set Filter</button>
    </div>

    <!-- Top Container -->
    <div
        class="large-container"
        style="height: {topHeight}%; background-color: {bColor}; overflow-y:scroll;"
    >
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
            <tbody id="sniffedPackets"> </tbody>
        </table>
    </div>

    <!-- Horizontal Resizer (Height Adjuster) -->
    <button
        class="horizontal-resizer"
        aria-label="Resize panel height"
        tabindex="0"
        on:mousedown={startDragHeight}
        on:keydown={adjustHeight}
    ></button>
    <!-- Bottom Row -->
    <div class="bottom-row" style="height: {bottomHeight}%; background-color: #ffffff;">
        <!-- Bottom Left Container with Layers -->
        <div class="small-container-left" style="width: {leftWidth}%; background-color: #ffffff;">
            {#if packetsDisplayed > 0}
                <!-- Expand/Collapse All Button at the Top Right -->
                <div class="layer-header" style="justify-content: flex-end; background-color: rgba(0, 0, 0, 0.1);">
                    <button on:click={toggleAll}>
                        {Object.values(collapsed).some(state => !state) ? "Collapse All" : "Expand All"}
                    </button>
                </div>
            
                <!-- Application Layer -->
                <div class="nested-container level-1" id="application-layer" style="background-color: #e8a898;">
                    <div class="layer-header">
                        <span>{sampleData.application.name}</span>
                        <button on:click={() => toggleCollapse('application')}>
                            {collapsed.application ? "Expand" : "Collapse"}
                        </button>
                    </div>
            
                    <!-- Content of Application Layer -->
                    {#if !collapsed.application}
                        <div class="layer-content">
                            {#each sampleData.application.data as item}
                                <p>{item}</p>
                            {/each}
                        </div>
                    {/if}
            
                    <!-- Transport Layer (Always Visible as Nested) -->
                    <div class="nested-container level-2" id="transport-layer" style="background-color: #e8c898;">
                        <div class="layer-header" >
                            <span>{sampleData.transport.name}</span>
                            <button on:click={() => toggleCollapse('transport')}>
                                {collapsed.transport ? "Expand" : "Collapse"}
                            </button>
                        </div>
            
                        <!-- Content of Transport Layer -->
                        {#if !collapsed.transport}
                            <div class="layer-content">
                                {#each sampleData.transport.data as item}
                                    <p>{item}</p>
                                {/each}
                            </div>
                        {/if}
            
                        <!-- Network Layer (Always Visible as Nested) -->
                        <div class="nested-container level-3" id="network-layer" style="background-color: #cbe898;">
                            <div class="layer-header">
                                <span>{sampleData.network.name}</span>
                                <button on:click={() => toggleCollapse('network')}>
                                    {collapsed.network ? "Expand" : "Collapse"}
                                </button>
                            </div>
            
                            <!-- Content of Network Layer -->
                            {#if !collapsed.network}
                                <div class="layer-content">
                                    {#each sampleData.network.data as item}
                                        <p>{item}</p>
                                    {/each}
                                </div>
                            {/if}
            
                            <!-- Link Layer (Always Visible as Nested) -->
                            <div class="nested-container level-4" id="link-layer" style="background-color: #98e8d9;">
                                <div class="layer-header">
                                    <span>{sampleData.link.name}</span>
                                    <button on:click={() => toggleCollapse('link')}>
                                        {collapsed.link ? "Expand" : "Collapse"}
                                    </button>
                                </div>
            
                                <!-- Content of Link Layer -->
                                {#if !collapsed.link}
                                    <div class="layer-content">
                                        {#each sampleData.link.data as item}
                                            <p>{item}</p>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                    
                </div>
            {/if}
        </div>


        <!-- Vertical Resizer (Width Adjuster) -->
        {#if rightWidth >= 11}
            <button
                class="vertical-resizer"
                aria-label="Resize panel width"
                tabindex="0"
                on:mousedown={startDragWidth}
                on:keydown={adjustWidth}
                style="left: {leftWidth}%;"
            >
            </button>
        {/if}


        <!-- Bottom Right Container -->
        {#if rightWidth < 11}
            <button on:click={openHex} style="">
                <img src={open_hex} alt="open hex" />
            </button>
        {:else}
            {#if packetsDisplayed > 0}
            <div
                class="hex-viewer"
                style="width: {rightWidth}%; background-color: #ffffff;"
                bind:this={hexContainer}
            ></div>

            {/if}
        {/if}
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
        overflow-y: auto; /* Scrollbar for the outermost container */
    }

    .options-bar
    {
        width: 100%;
        height: 4%;
        background-color: #333;
        color: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        border-bottom: 10px solid rgb(0, 0, 0);
    }

    .options
    {
        position: absolute;
        width: 150px;
        height: 32px;
    }

    #reset
    {
        left: 200px;
    }

    #removeFilter
    {
        right: 795px;
    }

    #displayedFilter
    {
        position: absolute;
        right: 490px;
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #filter
    {
        position: absolute;
        right: 180px;
        width: 300px;
    }

    #setFilter
    {
        right: 25px;
    }

    .options
    {
        position: absolute;
        width: 150px;
        height: 32px;
    }

    #sniffButton
    {
        left: 25px;
    }

    #reset
    {
        left: 200px;
    }

    #removeFilter
    {
        right: 795px;
    }

    #displayedFilter
    {
        position: absolute;
        right: 490px;
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #filter
    {
        position: absolute;
        right: 180px;
        width: 300px;
    }

    #setFilter
    {
        right: 25px;
    }

    .large-container
    {
        width: 100%;
        align-items: flex-start;
        justify-content: flex-start;
        color: rgb(0, 0, 0);
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

    .small-container-left
    {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        margin: 0;
        padding-left: 7px;
        padding-right: 10px; /* Add padding on the right side */
        box-sizing: border-box;
        overflow: auto;
        scrollbar-width: thin; /* Thin scrollbar */
        scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1); /* Thumb and track color */
    }
    
    .small-container-left::-webkit-scrollbar
    {
        width: 8px; /* Width of vertical scrollbar */
        height: 8px; /* Height of horizontal scrolblar */
    }

    .small-container-left::-webkit-scrollbar-track
    {
        background: rgba(0, 0, 0, 0.1); /* Track color */
        border-radius: 4px; /* Smooth rounded edges */
    }

    .small-container-left::-webkit-scrollbar-thumb
    {
        background: rgba(0, 0, 0, 0.3); /* Thumb color */
        border-radius: 4px; /* Smooth rounded edges */
        transition: background 0.3s;
    }

    .small-container-left::-webkit-scrollbar-thumb:hover
    {
        background: rgba(0, 0, 0, 0.5); /* Highlighted on hover */
    }

    .layer-header
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        font-weight: bold;
        background-color: rgba(255, 255, 255, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        position: relative; /* Ensure it doesn’t overlap content */
        z-index: 1;
    }

    .layer-content
    {
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        margin-top: 5px; /* Add spacing below the header */
    }

    .nested-container
    {
        margin: 10px;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        overflow-y: auto;
    }


    /* Horizontal Resizer (Height Adjuster) */
    .horizontal-resizer {
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
    .vertical-resizer {
        width: 10px;
        background-color: #000;
        cursor: ew-resize;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
        transform: translateX(-50%); /* Center the resizer on the boundary */
    }



    .vertical-resizer:hover
    {
        background-color: #555;
    }

    /* HEX */
    .hex-viewer {
        width: 100%;
        height: 100%;
        overflow: auto;
        font-family: monospace;
        font-size: 14px;
        background: #fff;
        color: #333;
        display: flex;
        justify-content: left;
        padding-left: 10px
    }

    :global(.hex-table)
    {
        border-collapse: collapse;
    }

    :global(.hex-table td)
    {
        padding: 0 4px;
        line-height: 1.2;
        white-space: pre;
    }

    :global(.hex-offset) {
        color: #666;
        width: 70px;
    }

    :global(.hex-values) {
        color: #333;
        font-family: monospace;
        padding-right: 10px !important;
    }

    :global(.hex-ascii) {
        color: #666;
    }
</style>
