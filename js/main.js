let train_system = function(inputs, theta, alpha, max_iterations, prob_num, w1, w2) {
    let errors_exist = true;

    let init_w1 = w1;
    let init_w2 = w2;

    let create_iteration_obj = (inputs) => {
        return {
            inputs: inputs.inputs,
            desired_out: inputs.des_out,
            actual_out: null,
            error: null
        }
    }

    let get_output = (inputs) => {
        let x1 = inputs[0];
        let x2 = inputs[1];
        if ((x1*w1 + x2*w2) >= theta) {
            return -1;
        }
        return 1;
    }

    inputs = inputs.map((input) => {
        return create_iteration_obj(input);
    });

    let num_epochs = 0;
    let num_errors = 0;

    while (errors_exist && num_epochs < max_iterations) {
        num_epochs++;
        num_errors=0;
        errors_exist = false;
        for (let input of inputs) {
            input.actual_out = get_output(input.inputs);
            input.error = input.desired_out - input.actual_out;
            w1 = w1 + input.inputs[0] * -input.error * alpha;
            w2 = w2 + input.inputs[1] * -input.error * alpha;
            if (input.error) {
                errors_exist = true;
                num_errors++;
            }
        }
    }

    let m = (-w1/w2).toFixed(2);
    let b = (theta/w2).toFixed(2);

    document.getElementById("prob_"+prob_num+"_table").style.display= "block";
    document.getElementById("prob_"+prob_num+"_epochs").innerHTML = num_epochs;
    document.getElementById("prob_"+prob_num+"_w1").innerHTML = w1.toFixed(4);
    document.getElementById("prob_"+prob_num+"_w2").innerHTML = w2.toFixed(4);
    document.getElementById("prob_"+prob_num+"_init_w1").innerHTML = init_w1.toFixed(4);
    document.getElementById("prob_"+prob_num+"_init_w2").innerHTML = init_w2.toFixed(4);
    document.getElementById("prob_"+prob_num+"_errors").innerHTML = num_errors;
   return {
        m: m,
        b: b
    };
}

let get_bf_line = function(m, b) {
    let bf_line = [];
    for (let x = 0; x<=1; x = x+.1){
        let y = (m*x);
        y = y + b;
        bf_line.push({
            x: x,
            y:y 
        });
    }
    let bf_line_chart = {
        label: 'y = '+m+'x + '+b,
        data: bf_line,
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        backgroundColor: "red",
        borderColor: "red",
        type: 'line',
        showLine:true,
        fill:false
    };
    return bf_line_chart;
}

let graph_points = function(inputs, element, vals) {
    let ctx = element;

    let set_1 = [];
    let set_neg_1 = [];
    for (let input of inputs) {
        if (input.des_out < 0) {
            set_neg_1.push({x: input.inputs[0],
                y: input.inputs[1]});
        }
        else {
            set_1.push({x: input.inputs[0],
                y: input.inputs[1]});
        }
    }

    let set_1_chart = {
        label: 'Output: 1',
        data: set_1,
        backgroundColor: "#FFF",
        borderColor: "#000",
        radius:5 
    };
    let set_neg_1_chart = {
        label: 'Output: -1',
        data: set_neg_1,
        backgroundColor: "#000",
        borderColor: "#000",
        radius:5 
    };

    let chart_data_array = [set_1_chart, set_neg_1_chart];

    if(vals) {
        let m = parseFloat(vals.m);
        let b = parseFloat(vals.b);
        let bf_line_chart = get_bf_line(m, b);
        chart_data_array.push(bf_line_chart);
    }

    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: chart_data_array,
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            steps: 10,
                            stepValue: .1,
                            max: 1
                        }
                    }]
                },
                animation: {
                    duration: 0, // general animation time
                },
                hover: {
                    animationDuration: 0, // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0 // animation duration after a resize
            }
        }
    });
}




let graph_prob_1= function() {
    let e              = document.getElementById("theta_1");
    let theta          = parseFloat(e.options[e.selectedIndex].value);
    e                  = document.getElementById("alpha_1");
    let alpha          = parseFloat(e.options[e.selectedIndex].value);
    e                  = document.getElementById("max_iterations_1");
    let max_iterations = parseFloat(e.options[e.selectedIndex].value);
    e                  = document.getElementById("w1_1");
    let w1 = parseFloat(e.options[e.selectedIndex].value);
    e                  = document.getElementById("w2_1");
    let w2 = parseFloat(e.options[e.selectedIndex].value);
    if (isNaN(w1)) {
        w1 = Math.random()-.5;
    }
    if (isNaN(w2)) {
        w2 = Math.random()-.5;
    }
    prob_1_vals        = train_system(prob_1_inputs, theta, alpha, max_iterations, 1, w1, w2);
    graph_points(prob_1_inputs, prob_1, prob_1_vals);
};

let graph_prob_2= function() {
    let e              = document.getElementById("theta_2");
    let theta          = parseFloat(e.options[e.selectedIndex].value);
    e                  = document.getElementById("alpha_2");
    let alpha          = parseFloat(e.options[e.selectedIndex].value);
    e                  = document.getElementById("max_iterations_2");
    let max_iterations = parseFloat(e.options[e.selectedIndex].value);
    e                  = document.getElementById("w1_2");
    let w1 = parseFloat(e.options[e.selectedIndex].value);
    e                  = document.getElementById("w2_2");
    let w2 = parseFloat(e.options[e.selectedIndex].value);
    if (isNaN(w1)) {
        w1 = Math.random()-.5;
    }
    if (isNaN(w2)) {
        w2 = Math.random()-.5;
    }
    prob_2_vals        = train_system(prob_2_inputs, theta, alpha, max_iterations, 2, w1, w2);
    graph_points(prob_2_inputs, prob_2, prob_2_vals);
};


