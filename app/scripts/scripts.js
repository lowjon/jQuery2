if(localStorage && localStorage.getItem('listo')){
  var listo = JSON.parse(localStorage.getItem('listo'));
  localStorage.clear();
} else{
    listo = [];
    localStorage.clear();
};


$(document).ready(function(){
  // localStorage.clear();
$('#newTaskForm').hide();

console.log(localStorage);



console.log(listo);

var Task = function(task){
  this.task = task;
  this.id = 'new';
};
// You're going to need to fix this function in order to get
// the info stored on the array loaded into the HTML
var reloadTheStuff = function(listo){
    for (var i = 0; i < listo.length; i++) {
      if(listo[i].id === 'new'){
        $('#newList').append(
          '<a href= "#finish" class="" id= "item">'+
          '<li class="list-group-item">'+
          '<h3>' + listo[i].task +'</h3>'+
          '<span class="arrow pull-right">'+
          '<i class="glyphicon glyphicon-arrow-right">' +
          '</span>'+
          '</li>' +
          '</a>'
        );
      } else if (listo[i].id === 'inProgress'){
        $('#currentList').append(
          '<a href= "#finish" class="" id= "inProgress">'+
          '<li class="list-group-item">'+
          '<h3>' + listo[i].task +'</h3>'+
          '<span class="arrow pull-right">'+
          '<i class="glyphicon glyphicon-arrow-right">' +
          '</span>'+
          '</li>' +
          '</a>'
        );
      } else if (listo[i].id === 'archived'){
        $('#archivedList').append(
          '<a href= "#finish" class="" id= "archived">'+
          '<li class="list-group-item">'+
          '<h3>' + listo[i].task +'</h3>'+
          '<span class="arrow pull-right">'+
          '<i class="glyphicon glyphicon-arrow-right">' +
          '</span>'+
          // '</li>' +
          '</a>'
        );
      }

    }
};
// var loadStuff = function(task){
//   $('#newList').append(
//     '<a href= "#finish" class="" id= "item">'+
//     '<li class="list-group-item">'+
//     '<h3>' + this.task +'</h3>'+
//     '<span class="arrow pull-right">'+
//     '<i class="glyphicon glyphicon-arrow-right">' +
//     '</span>'+
//     '</li>' +
//     '</a>'
//   );
//
// };

var addTask = function (task) {
  if (task){
    task = new Task(task);
    listo.push(task);

    $('#newItemInput').val('');

    $('#newList').append(
      '<a href= "#finish" class="" id= "item">'+
      '<li class="list-group-item">'+
      '<h3>' + task.task +'</h3>'+
      '<span class="arrow pull-right">'+
      '<i class="glyphicon glyphicon-arrow-right">' +
      '</span>'+
      '</li>' +
      '</a>'
    );
  }
  $('#newTaskForm').slideToggle('fast','linear');
};

var advanceTask = function (task) {
  var modified = task.innerText.trim().toLowerCase();
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if(listo[i].id === 'new'){
        listo[i].id = 'inProgress';
      } else if(listo[i].id === 'inProgress'){

        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};


// $(window).load(reloadTheStuff(listo));
reloadTheStuff(listo);
console.log(listo);

$('#saveNewItem').on('click', function(e){
  e.preventDefault();
  var task = $('#newItemInput').val().trim();
  addTask(task);
  // reloadTheStuff(listo);
});

$('#add-todo').on('click', function () {
  $('#newTaskForm').fadeToggle('fast', 'linear');
  $('#newItemInput').focus();
});

$('#cancel').on('click', function (e) {
  e.preventDefault();
  $('#newTaskForm').fadeToggle('fast', 'linear');
});

$(document).on('click', '#item', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = "inProgress";
  $('#currentList').append(this.outerHTML);
});

$(document).on('click', '#inProgress', function (e) {
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});

$(document).on('click', '#archived', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
});

$('#newItemInput').bind('keypress', function(e){
 var key = e.which;
 if(key === 13){
   $('#saveNewItem').trigger('click');
 }
});

console.log(listo);

$(window).unload(function () {
  localStorage.setItem('listo', JSON.stringify(listo));
});

console.log(localStorage);

});
