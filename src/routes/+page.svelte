<script>
    import { onMount } from "svelte";
    import jQuery from "jquery";
    import { packets } from "../data.js";

    import open_hex from "../assets/open_hex.svg";
    import close_hex from "../assets/close_hex.svg";

    // Heights and widths as percentages
    let leftWidth = 100; // Width of the left container
    let rightWidth = 0; // Width of the right container
    let topHeight = 50; // Height of the top container
    let bottomHeight = 50; // Height of the bottom row

    let isDraggingHeight = false; // For resizing heights (up and down)
    let isDraggingWidth = false; // For resizing widths (left and right)

    // Reiszing Heights (Horizontal Resizer)
    const startDragHeight = () => (isDraggingHeight = true);
    const stopDragHeight = () => (isDraggingHeight = false);

    const onDragHeight = (event) => {
        if (!isDraggingHeight) return;

        const totalHeight = window.innerHeight; // Total height of the viewport
        const mouseY = event.clientY;

        const newTopHeight = (mouseY / totalHeight) * 100;
        const newBottomHeight = 100 - newTopHeight;

        if (newTopHeight >= 10 && newBottomHeight >= 10) {
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

    let hexContainer;

    // Resizing Widths  (Vertical Resizer)
    const startDragWidth = () => (isDraggingWidth = true);
    const stopDragWidth = () => (isDraggingWidth = false);

    const onDragWidth = (event) => {
        if (!isDraggingWidth) return;

        const totalWidth = document.body.offsetWidth; // Total width of the viewport
        const mouseX = event.clientX;

        const newLeftWidth = (mouseX / totalWidth) * 100;
        const newRightWidth = 100 - newLeftWidth;

        if (newLeftWidth >= 10 && newRightWidth >= 4)
            {
                leftWidth = newLeftWidth;
                rightWidth = newRightWidth;
            }
    };
    // Added keyboard controll of the adjustable separators for user-friendlyness and A11y
    const adjustWidth = (event) => {
        if (event.key === "ArrowLeft") {
            const newLeftWidth = Math.max(10, leftWidth - 1);
            const newRightWidth = 100 - newLeftWidth;
            if (newRightWidth >= 4) {
                leftWidth = newLeftWidth;
                rightWidth = newRightWidth;
            }
        } else if (event.key === "ArrowRight") {
            const newLeftWidth = Math.min(90, leftWidth + 1);
            const newRightWidth = 100 - newLeftWidth;
            if (newRightWidth >= 4) {
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

    let running = false; // are packets being sniffed?
    let bColor = "#4caf50"; // background color for the sniffed packets section
    let sniffButtonLabel = "Sniff Packets";
    let cancel = false; // should we cancel the packet sniffing?
    let filter = ""; // filter the user can set to display certain packets
    let allPackets = []; // contains all packets sniffed
    let packetsDisplayed = 0;

    $: if (running == true) {
        bColor = "#e17878";
        sniffButtonLabel = "Stop Sniffing Packets";
    }

    $: if (running == false) {
        bColor = "#4caf50";
        sniffButtonLabel = "Sniff Packets";
    }

    function sniffPacket(i) {
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
                ) {
                } else {
                    matchesFilters = false;
                    break;
                }
            }
        }
        if (matchesFilters == true) {
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
    }

    function runWireshark() {
        if (running == true) {
            cancel = true;
            setTimeout(function () {
                running = false;
                cancel = false;
            }, 1000);
            // might need to adjust depending on size of data file
        } else {
            running = true;
            let numPackets = Object.keys(packets.application).length;
            for (let i = 0; i < numPackets; i++) {
                setTimeout(function () {
                    if (!cancel) {
                        sniffPacket(i);
                    }
                }, 500 * i);
            }
            setTimeout(
                function () {
                    running = false;
                },
                500 * (numPackets - 1),
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
                if (matchesFilters == true) {
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
                            "</td></tr>",
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
                    "</td></tr>",
            );
            packetsDisplayed += 1;
        }
    }

    function resetPackets() {
        jQuery("#sniffedPackets").empty();
        packetsDisplayed = 0;
        allPackets = [];
    }

    $: if (rightWidth < 5) {
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
        <button on:click={runWireshark}> {sniffButtonLabel}</button>
        <input type="text" id="filter" />
        <button on:click={setFilter}> Set Filter</button>
        <p>Filter: {filter}</p>
        <button on:click={removeFilter}> Remove Filter</button>
        <button on:click={resetPackets}> Reset Packets</button>
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
    <div
        class="bottom-row"
        style="height: {bottomHeight}%; background-color: #f1f1f1;"
    >
        <!-- Bottom Left Container with Nested Containers -->
        <div
            class="small-container"
            style="width: {leftWidth}%; background-color: #2196f3;"
        >
            <div class="nested-container level-1">
                Level 1
                <div class="nested-container level-2">
                    Level 2
                    <div class="nested-container level-3">
                        Level 3
                        <div class="nested-container level-4">
                            Level 4
                            <div class="nested-container level-5">Level 5</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Vertical Resizer (Width Adjuster) -->
        <button
            class="vertical-resizer"
            aria-label="Resize panel width"
            tabindex="0"
            on:mousedown={startDragWidth}
            on:keydown={adjustWidth}
            style="left: {leftWidth}%;"
        >
        </button>


        <!-- Bottom Right Container -->
        {#if rightWidth < 5}
            <button on:click={openHex}>
                <img src={open_hex} alt="open hex" />
            </button>
        {:else}
            <div
                class="hex-viewer small-container"
                style="width: {rightWidth}%; background-color: #ff9800;"
                bind:this={hexContainer}
            ></div>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        outline: 10px solid black;
    }

    .options-bar {
        width: 100%;
        height: 4%;
        background-color: #333;
        color: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        border-bottom: 10px solid rgb(0, 0, 0); /* Add a bottom outline */
    }

    .large-container {
        width: 100%;
        /*display: flex;*/
        align-items: center;
        justify-content: center;
        color: rgb(0, 0, 0);
        outline: #000;
        font-size: 1.5rem;
    }

    table {
        width: 100%;
    }

    th {
        border: 2px solid black;
    }

    .bottom-row {
        display: flex;
        width: 100%;
        position: relative;
    }

    .small-container {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        overflow: hidden;
    }

    .nested-container {
        width: 80%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.8rem;
        border: 2px solid white;
    }

    .level-1 {
        background-color: #f44336;
    }

    .level-2 {
        background-color: #e91e63;
    }

    .level-3 {
        background-color: #9c27b0;
    }

    .level-4 {
        background-color: #673ab7;
    }

    .level-5 {
        background-color: #3f51b5;
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

    .horizontal-resizer:hover {
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
    }

    .vertical-resizer:hover {
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
        justify-items: center;
    }

    :global(.hex-table) {
        border-collapse: collapse;
    }

    :global(.hex-table td) {
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
