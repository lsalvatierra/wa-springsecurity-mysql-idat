$(document).on("click", "#btnagregarcurso", function() {
	$("#txtnomcurso").val("");
	$("#txtcredito").val("");
	$("#hddidcurso").val("0");
	$("#modalcurso").modal("show");
});


$(document).on("click", ".btnactualizarcurso", function() {
	$("#txtnomcurso").val($(this).attr("data-nomcurso"));
	$("#txtcredito").val($(this).attr("data-credcurso"));
	$("#hddidcurso").val($(this).attr("data-codcurso"));
	$("#modalcurso").modal("show");
});

$(document).on("input", "#txtcredito", function() {
	this.value = this.value.replace(/[^0-9]/g, '');
});

$(document).on("click", "#btnregistrarcurso", function() {
	if ($("#txtnomcurso").val() === "") {
		$("#errornomcurso").text("Es obligatorio ingresar el nombre del curso");
	} else {
		$("#errornomcurso").text("");
	}

	if ($("#txtcredito").val() === "") {
		$("#errorcredcurso").text("Es obligatorio ingresar el crédito del curso");
	} else {
		$("#errorcredcurso").text("");
	}
	if ($("#txtnomcurso").val() !== "" && $("#txtcredito").val() !== "") {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/Curso/registrarCurso",
			data: JSON.stringify({
				idcurso: $("#hddidcurso").val(),
				nomcurso: $("#txtnomcurso").val(),
				credito: $("#txtcredito").val()
			}),
			success: function(resultado) {
				if (resultado.respuesta) {
					mostrarMensaje(resultado.mensaje, "success");
					ListarCursos();
				}else{
					mostrarMensaje(resultado.mensaje, "danger");
				}
			}
		})
		$("#modalcurso").modal("hide");
	}
});

$(document).on("click", ".btneliminarcurso", function() {
	$("#hddidcursoeliminar").val("");
	$("#mensajeeliminar").text("¿Está seguro de eliminar el curso: " +
		$(this).attr("data-nomcurso") + "?");
	$("#hddidcursoeliminar").val($(this).attr("data-codcurso"));
	$("#modaleliminarcurso").modal("show");
});

$(document).on("click", "#btneliminarcurso", function() {
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		url: "/Curso/eliminarCurso",
		data: JSON.stringify({
			idcurso: $("#hddidcursoeliminar").val()
		}),
		success: function(resultado) {
			if (resultado.respuesta) {
				mostrarMensaje(resultado.mensaje, "success");
				ListarCursos();
			}else{
				mostrarMensaje(resultado.mensaje, "danger");
			}
			$("#modaleliminarcurso").modal("hide");
		}
	})
});


function ListarCursos() {
	$.ajax({
		type: "GET",
		url: "/Curso/listarCursos",
		dataType: 'json',
		success: function(resultado) {
			$("#tblcurso > tbody").html("");
			$.each(resultado, function(index, value) {
				$("#tblcurso > tbody").append("<tr>" +
					"<td>" + value.idcurso + "</td>" +
					"<td>" + value.nomcurso + "</td>" +
					"<td>" + value.credito + "</td>" +
					"<td><button type='button' class='btn btn-primary btnactualizarcurso'" +
					" data-codcurso='" + value.idcurso + "' " +
					" data-nomcurso='" + value.nomcurso + "' " +
					" data-credcurso='" + value.credito + "' " +
					">Actualizar</button></td>" +
					"<td><button type='button' class='btn btn-danger btneliminarcurso'" +
					" data-codcurso='" + value.idcurso + "' " +
					" data-nomcurso='" + value.nomcurso + "' " +
					">Eliminar</button></td>" +
					"</tr>"
				)
			})
		}
	})
}

function mostrarMensaje(mensaje, estilo){
	$("#mensaje").html("")
	$("#mensaje").append("<div class='alert alert-"+estilo+" alert-dismissible fade show' role='alert'>"+
	"<strong>"+mensaje+"</strong>"+
	"<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"+
	"</div>")
	
}
