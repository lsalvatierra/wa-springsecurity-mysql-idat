$(document).ready(function(){
	$("#tblalumno").hide();
});
$(document).on("change", "#cboespecialidad", function(){
	var idespecialidad = $("#cboespecialidad").val();
	//alert(idespecialidad);
	if(idespecialidad === 0){
		$("#tblalumno").hide();
		$("#tblalumno").html("");
		alert("Seleccione una especialidad");
	}else{
		$.ajax({
			type: "GET",
			url: "/Alumno/listarAlumnosxEspecialidad",
			data: {
				idesp: idespecialidad
			},
			success: function(data){
				//console.log(data);
				$("#tblalumno").html("");
				if(data.length > 0){
					$.each(data, function(index, value){
						var procedencia = value.proce == "P" ? "Particular" : "Estatal";
						$("#tblalumno").append("<div class='col mb-4' >"+
							"<div class='card h-100 border-primary'>"+
							"<img src='/img/silueta.jpg' class='card-img-top' alt=''>"+
							"<div class='card-body'>"+
							"<h5 class='card-title'>Cod.Alumno: "+value.idalumno+"</h5>"+
							"<p class='card-text'>"+value.apealumno+" "+ value.nomalumno+"<br />"+
							"Colegio: "+ procedencia +"</p>"+
							"<button type='button' data-codalumno='"+value.idalumno+"' class='btn btn-primary btnvernotas'>"+
							"Ver Notas</button>"+
							"</div></div></div>");
						
					});
					$("#tblalumno").show();
				}else{
					$("#tblalumno").hide();
				}
			}
		})
	}	
});

$(document).on("click", ".btnvernotas", function(){
	$("#modalcursosnota").modal("show");
	$.ajax({
		type: "GET",
		url: "/Alumno/listarCursosNotaxAlumno",
		data: {
			idalumno: $(this).attr("data-codalumno")
		},
		success: function(resultado){
			console.log(resultado);
			$("#tblcursonota > tbody").html("");
			$.each(resultado, function(index, value){
				$("#tblcursonota > tbody").append("<tr>"+
					"<td>"+value.nomcurso+"</td>"+
					"<td class='text-center'>"+value.credito+"</td>"+
					"<td class='text-center'>"+value.exaparcial+"</td>"+
					"<td class='text-center'>"+value.exafinal+"</td></tr>"				
				);
			})
		}
	})
})
