var app = angular.module('schedulingApp', []);

app.controller('ctrl', function ($scope) {
    $scope.tab = 1;

    $scope.setTab = function (val) {
        $scope.tab = val;
    };

    $scope.isSet = function (val) {
        return $scope.tab === val;
    };


    $scope.instructors =
        [{
            name: 'Prof 1',
            instructorID: 1,
            sections: [
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 3,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 4,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 5,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 6,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 7,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                }
            ]
        },
        {
            name: 'Prof 2',
            instructorID: 2,
            sections: [
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 8,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 9,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 10,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 11,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 12,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                }
            ]
        },
        {
            name: 'Prof 3',
            instructorID: 3,
            sections: [
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 13,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 14,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 15,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 16,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 17,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                }
            ]
        },
        {
            name: 'Prof 4',
            instructorID: 4,
            sections: [
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 18,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 19,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 20,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 1,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                },
                {
                    course: {
                        courseName: 2112,
                        courseID: 4
                    },
                    sectionID: 2,
                    sectionName: "0A",
                    startTime: {
                        time: "12:05 PM",
                        timeID: 12
                    },
                    endTime: {
                        time: "12:55 PM",
                        timeID: 12
                    },
                    room: {
                        roomID: 2,
                        roomName: "103",
                        building: {
                            buildingID: 7,
                            buildingName: "EERC"
                        }
                    },
                    year: 2016,
                    semester: {
                        semesterID: 3,
                        semester: "Fall"
                    },
                    type: "On Campus",
                    credits: 3,
                    CRN: "12345",
                    isLab: false
                }
            ]
        }
        ];
    angular.element(document).ready(
        function () {
            var options = {
                width: 12,
                float: false,
                acceptWidgets: '.grid-stack-item',
                resizable: false
            };
            $('.grid-stack').each(function () {
                $(this).gridstack(options);
            });



            $('.grid-stack').each(function () {
                var grid = $(this).data('gridstack');

                _.each(items, function (node) {
                    grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
                        node.x, node.y, node.width, node.height);
                }, this);
            });
        });
});


var rooms =
    [
        {
            building: 'building',
            roomNumber: '100',
            capacity: 75,
            courses: [
                {
                    section: 'L01',
                    courseName: 'stuff'
                },
                {
                    section: 'L02',
                    courseName: 'otherStuff'
                }
            ]
        },
        {
            building: 'other building',
            roomNumber: '150',
            capacity: 100,
            courses: [
                {
                    section: 'L01',
                    courseName: 'stuff'
                },
                {
                    section: 'L02',
                    courseName: 'otherStuff'
                }
            ]
        }

    ];

var labs = 
       [
        {
            building: 'building',
            roomNumber: '100',
            capacity: 75,
            courses: [
                {
                    section: 'L01',
                    courseName: 'stuff'
                },
                {
                    section: 'L02',
                    courseName: 'otherStuff'
                }
            ]
        },
        {
            building: 'other building',
            roomNumber: '150',
            capacity: 100,
            courses: [
                {
                    section: 'L01',
                    courseName: 'stuff'
                },
                {
                    section: 'L02',
                    courseName: 'otherStuff'
                }
            ]
        }

       ];

$();

