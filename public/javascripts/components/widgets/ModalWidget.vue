<template>
<div class="modal fade" id="myModalGas" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-warning">
        <p>
        	<span class="fas fa-exclamation-triangle"></span>
        </p>
      </div>
      <div class="modal-body text-center">
        He detectado una fuga de gas
      </div>
    </div>
  </div>
</div>
</template>

<script>
	module.exports = {
		name: "ModalWidget",

	}
</script>

<style>
.svg-inline--fa {
    font-size: 12em;
    color: white;
}
div.modal-header.bg-warning {
	display: block !important;
	align-items: center !important;
	text-align: center !important;
}

.modal-body {
	font-weight: 900;
	font-size: 3em;
}
</style>