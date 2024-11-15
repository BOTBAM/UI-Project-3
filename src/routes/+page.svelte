<script>

</script>
<div class="container">
<div class="large-container"> Main Packets Container</div>
    <div class="bottom-row">
        <!-- Bottom Left, Layers Container -->
        <div class="small-container">
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
        <!-- Bottom Right Container, Hex I guess lol -->
        <div class="small-container"> Hex Container</div>
    </div>
</div>
      
  <style>
    .container
    {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      padding: 1rem;
    }
  
    .large-container
    {
      width: 100%;
      height: 200px;
      background-color: #4caf50;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  
    .bottom-row
    {
      display: flex;
      width: 100%;
      gap: 1rem;
    }
  
    .small-container
    {
      flex: 1;
      height: 100px;
      background-color: #2196f3;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      position: relative;
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
  </style>
  
