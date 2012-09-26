$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                zoomType: 'xy'
            },
            title: {
                text: 'No Cache - onload'
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: ['LinkedIn','Facebook','Google','Twitter']
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    formatter: function() {
                        return this.value +'KB';
                    },
                    style: {
                        color: '#89A54E'
                    }
                },
                title: {
                    text: 'Size',
                    style: {
                        color: '#89A54E'
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Time',
                    style: {
                        color: '#4572A7'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value +' ms';
                    },
                    style: {
                        color: '#4572A7'
                    }
                }

            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'HTTP Requests',
                    style: {
                        color: '#AA4643'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value +'';
                    },
                    style: {
                        color: '#AA4643'
                    }
                },
                opposite: true
            }],
            tooltip: {
                formatter: function() {
                    var unit = {
                        'Size': 'KB',
                        'Time': 'ms',
                        'Requests': 'HTTP requests'
                    }[this.series.name];

                    return ''+
                        this.x +': '+ this.y +' '+ unit;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 40,
                floating: true,
                backgroundColor: '#FFFFFF'
            },
            series: [{
                name: 'Time',
                color: '#4572A7',
                type: 'column',
                yAxis: 1,
                data: [404,1080,600,699]

            }, {
                name: 'Requests',
                type: 'spline',
                color: '#AA4643',
                yAxis: 2,
                data: [6,11,10,7],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot'

            }, {
                name: 'Size',
                color: '#89A54E',
                type: 'spline',
                data: [80.92,135.33,2.38,38.7]
            }]
        });
    });
});

$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container2',
                zoomType: 'xy'
            },
            title: {
                text: 'Cached - onload/refresh'
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: ['LinkedIn','Facebook','Google','Twitter']
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    formatter: function() {
                        return this.value +'KB';
                    },
                    style: {
                        color: '#89A54E'
                    }
                },
                title: {
                    text: 'Size',
                    style: {
                        color: '#89A54E'
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Time',
                    style: {
                        color: '#4572A7'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value +' ms';
                    },
                    style: {
                        color: '#4572A7'
                    }
                }

            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'HTTP Requests',
                    style: {
                        color: '#AA4643'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value +'';
                    },
                    style: {
                        color: '#AA4643'
                    }
                },
                opposite: true
            }],
            tooltip: {
                formatter: function() {
                    var unit = {
                        'Size': 'KB',
                        'Time': 'ms',
                        'Requests': 'HTTP requests'
                    }[this.series.name];

                    return ''+
                        this.x +': '+ this.y +' '+ unit;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 40,
                floating: true,
                backgroundColor: '#FFFFFF'
            },
            series: [{
                name: 'Time',
                color: '#4572A7',
                type: 'column',
                yAxis: 1,
                data: [367,824,464,265]

            }, {
                name: 'Requests',
                type: 'spline',
                color: '#AA4643',
                yAxis: 2,
                data: [6,11,9,6],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot'

            }, {
                name: 'Size',
                color: '#89A54E',
                type: 'spline',
                data: [45.11,9.29,0.915,1.53]
            }]
        });
    });
});

$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container3',
                zoomType: 'xy'
            },
            title: {
                text: 'After Click - Parent DOM updates'
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: ['LinkedIn','Google','Twitter','Facebook']
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    formatter: function() {
                        return this.value +'KB';
                    },
                    style: {
                        color: '#89A54E'
                    }
                },
                title: {
                    text: 'Size',
                    style: {
                        color: '#89A54E'
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Time',
                    style: {
                        color: '#4572A7'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value +' ms';
                    },
                    style: {
                        color: '#4572A7'
                    }
                }

            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'HTTP Requests',
                    style: {
                        color: '#AA4643'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value +'';
                    },
                    style: {
                        color: '#AA4643'
                    }
                },
                opposite: true
            }],
            tooltip: {
                formatter: function() {
                    var unit = {
                        'Size': 'KB',
                        'Time': 'ms',
                        'Requests': 'HTTP requests'
                    }[this.series.name];

                    return ''+
                        this.x +': '+ this.y +' '+ unit;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 400,
                verticalAlign: 'top',
                y: 40,
                floating: true,
                backgroundColor: '#FFFFFF'
            },
            series: [{
                name: 'Time',
                color: '#4572A7',
                type: 'column',
                yAxis: 1,
                data: [204,1910]

            }, {
                name: 'Requests',
                type: 'spline',
                color: '#AA4643',
                yAxis: 2,
                data: [2,29,0,0],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot'

            }, {
                name: 'Size',
                color: '#89A54E',
                type: 'spline',
                data: [23.57,1.99,0,0]
            }]
        });
    });
});