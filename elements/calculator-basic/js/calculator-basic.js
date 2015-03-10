/**
 * Created by Dimitar on 9/5/14.
 */


    function simple_calc(){

        var final_calculation=false;
        var new_ex=false;
        var register='';
        var memory='';

        function resetAns(){
            $('body /deep/ #ans').val('');
            $('body /deep/ #ans').attr("placeholder", '0');
        }

        function addToRegister(val){
            register += val;
            $('body /deep/ #mhe_register').html(register);
        }

        function setRegister(val){
            register = val;
            $('body /deep/ #mhe_register').html(register);
        }

        function addOperator(op){
            $('body /deep/ #ans').val( $('body /deep/ #ans').val() + op);
            addToRegister($('body /deep/ #ans').val());
            resetAns();
            new_ex=true;
            final_calculation=false;
        }

        function appendLiteral(li){
            new_ex = false;
            if(final_calculation){
                C();
                appendLiteral(li);
            } else {
                if(!isNaN(li)){
                   $('body /deep/ #ans').val(eval( $('body /deep/ #ans').val() + li));
                } else {
                   $('body /deep/ #ans').val($('body /deep/ #ans').val() + li);
                }
            }
        }

        function C(){
            final_calculation=false;
            setRegister('');
            memory = 0;
            resetAns();
        }

        function CE(){
            resetAns();
        }

        function addDecimalPoint(){
            if($('body /deep/ #ans').val().indexOf('.') === -1){
                appendLiteral('.');
            }
        }

        function pct(){
            if($('body /deep/ #ans').val() === '') return;
            $('body /deep/ #ans').val( eval($('body /deep/ #ans').val()) / 100) ;
        }

        function plus_minus(){
            if($('body /deep/ #ans').val() === '') return;
            $('body /deep/ #ans').val( -1 * eval($('body /deep/ #ans').val()));
        }

        function recip(){
            if($('body /deep/ #ans').val() === '') return;
            $('body /deep/ #ans').val( 1 / eval($('body /deep/ #ans').val()) );
        }

        function sqrt(){
            if($('body /deep/ #ans').val() === '') return;
            $('body /deep/ #ans').val(Math.sqrt(eval($('body /deep/ #ans').val())));
        }

        function power2(){
            if($('body /deep/ #ans').val() === '') return;
            $('body /deep/ #ans').val( Math.pow(eval($('body /deep/ #ans').val()),2));
        }

        function power3(){
            if($('body /deep/ #ans').val() === '') return;
            $('body /deep/ #ans').val( Math.pow(eval($('body /deep/ #ans').val()),3) );
        }

        function mem_clear(){
            memory = 0;
            new_ex=true;
        }

        function mem_recall(){
            if(memory !== '' && new_ex){
               $('body /deep/ #ans').val( memory );
            }
        }

        function mem_add(){
            if($('body /deep/ #ans').val() !== ''){
              if(memory === '') memory = 0;
              memory +=  eval($('body /deep/ #ans').val());
            }
            resetAns();
            new_ex=true;
        }

        var mem_sub = function(){
            if($('body /deep/ #ans').val() !== ''){
                if(memory === '') memory = 0;
                memory -=  eval($('body /deep/ #ans').val());
            }
            resetAns();
            new_ex=true;
        };

        var calculateFinal = function(){
            if(!final_calculation){
                addToRegister($('body /deep/ #ans').val());
                $('body /deep/ #ans').val( eval(register) );
                final_calculation=true;
                setRegister('');
            }
        };

        var registerEvents = function(){

            $('body /deep/ #b_MC').click( function() {
                mem_clear();
            });

            $('body /deep/ #b_MR').click( function() {
                mem_recall();
            });

            $('body /deep/ #b_M_plus').click( function() {
                mem_add();
            });

            $('body /deep/ #b_M_minus').click( function() {
                mem_sub();
            });

            $('body /deep/ #b_C').click( function() {
                C();
            });

            $('body /deep/ #b_CE').click( function() {
                CE();
            });

            $('body /deep/ #b_point').click( function() {
                addDecimalPoint();
            });

            $('body /deep/ #b_plus_minus').click( function() {
                plus_minus();
            });

            $('body /deep/ #b_pct').click( function() {
                pct();
            });

            $('body /deep/ #b_sqrt').click( function() {
                sqrt();
            });

            $('body /deep/ .calc_lit').click( function() {
                if(this.value === undefined) return;
                appendLiteral(this.value);
            });

            $('body /deep/ #b_plus').click( function() {
                addOperator('+');
            });

            $('body /deep/ #b_minus').click( function() {
                addOperator('-');
            });

            $('body /deep/ #b_mult').click( function() {
                addOperator('*');
            });

            $('body /deep/ #b_div').click( function() {
                addOperator('/');
            });

            $('body /deep/ #b_recip').click( function() {
                recip();
            });

            $('body /deep/ #b_pow2').click( function() {
                power2();
            });

            $('body /deep/ #b_pow3').click( function() {
                power3();
            });

            $('body /deep/ #b_calc').click( function() {
                calculateFinal();
            });
        };

        this.init = function(){
            registerEvents();
        };
    }
