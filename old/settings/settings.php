

<br><br>

    <div class="panel-group" id="accordion">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#dataImport">Import New Data</a>
                </h4>
            </div><!-- End of Import data heading -->
            <div id="dataImport" class="panel-collapse collapse">
                <div class="panel-body">
                    <div class="col-sm-12 container">
                        <div align="center" class="col-sm-12"><h2>Add New Data</h2></div>
                        <h3>Instructions</h3>
                        <p>
                            In order to add new data to the application, you must follow these steps:
                            <ol>
                                <li>Go to Banweb and navigate to the classes that need to be added.</li>
                                <li>Highlight all the classes you wish to add, including the column headers.</li>
                                <li>Copy the text, and paste it into an empty Excel spreadsheet in the A1 cell.</li>
                                <li>Save the document as a .CSV file instead of a .xls file.</li>
                                <li>Select the file using the file selector below., the hit the "Import Data" button.</li>
                            </ol>
                        </p>
                        <label for="year">Year</label>
                        <input id="year" type="text" ng-model="year" class="form-control"/>
                        <input type="button" class="btn" ng-click="newSchedule()" value="Import Data" ng-disabled="disableImportButton">
                        
                        <div class="progress">
                            <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
                          aria-valuenow="loadingBarValue" aria-valuemin="0" aria-valuemax="100"  id="newScheduleProgress">
                            </div><!-- End of progress bar -->
                        </div><!-- End of progress -->
                    
                    </div><!-- End of container -->
                    
                    
                    
                </div><!-- End of Import panel body -->
            </div><!-- End of dataImport -->
        </div><!-- End of Import Panel -->
        
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#buildingUpdate">Update Building Numbers</a>
                </h4>
            </div><!-- End of building header -->
            <div id="buildingUpdate" class="panel-collapse collapse">
                <div class="panel-body">
                    
                </div><!-- End of building body -->
            </div><!-- End of buildingUpdate -->
        </div><!-- End of building panel -->
        
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#manageInstructors">Manage Instructors</a>
                </h4>
            </div>
            <div id="manageInstructors" class="panel-collapse collapse">
                <div class="panel-body">
                    
                </div><!-- End of instructor body -->
            </div><!-- End of manageInstructors -->
        </div><!-- End of instructor panel -->
    </div><!-- End of accordion -->
    
    
    
<br>
