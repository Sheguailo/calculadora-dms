function obtenerVariable(cartera) {

    if (cartera >= 1 && cartera <= 100) {
        return 492750;
    }

    if (cartera >= 101 && cartera <= 130) {
        return 547500;
    }

    if (cartera >= 131 && cartera <= 160) {
        return 602250;
    }

    if (cartera >= 161) {
        return 657000;
    }

    return 0;
}


function pagoKPI(cumplimiento, piso, techo, pagoTecho) {

    if (cumplimiento < piso) {
        return 0;
    }

    if (cumplimiento <= 1) {

        return 0.90 +
            ((cumplimiento - piso) / (1 - piso)) * 0.10;

    }

    if (cumplimiento <= techo) {

        return 1 +
            ((cumplimiento - 1) / (techo - 1))
            * (pagoTecho - 1);

    }

    return pagoTecho;
}


function calcular() {

    const cartera =
        Number(document.getElementById("cartera").value);

    const variable = obtenerVariable(cartera);

    if (variable === 0) {
        alert("Ingresa una cartera válida.");
        return;
    }

    document.getElementById("variable").innerHTML =
        "Variable asignada: $" +
        variable.toLocaleString("es-CO");


    /* EFECTIVIDAD DE VENTA */

    const efectividad =
        Number(document.getElementById("efectividad").value) / 100;

    const pagoEfectividad =
        pagoKPI(efectividad, 0.60, 0.85, 1.05);

    const valorEfectividad =
        variable * 0.10 * pagoEfectividad;


    /* COLOCACIÓN */

    const metaColocacion =
        Number(document.getElementById("metaColocacion").value);

    const colocacion =
        Number(document.getElementById("colocacion").value);

    const cumplimientoColocacion =
        colocacion / metaColocacion;

    const pagoColocacion =
        pagoKPI(
            cumplimientoColocacion,
            0.90,
            1.20,
            1.20
        );

    const valorColocacion =
        variable * 0.30 * pagoColocacion;


    /* PAQUETE FOCO */

    const metaFoco =
        Number(document.getElementById("metaFoco").value);

    const foco =
        Number(document.getElementById("foco").value);

    const cumplimientoFoco =
        foco / metaFoco;

    const pagoFoco =
        pagoKPI(
            cumplimientoFoco,
            0.90,
            1.50,
            1.50
        );

    const valorFoco =
        variable * 0.30 * pagoFoco;


    /* TRÁFICO */

    const metaTrafico =
        Number(document.getElementById("metaTrafico").value);

    const trafico =
        Number(document.getElementById("trafico").value);

    const cumplimientoTrafico =
        trafico / metaTrafico;

    const pagoTrafico =
        pagoKPI(
            cumplimientoTrafico,
            0.90,
            1.10,
            1.10
        );

    const valorTrafico =
        variable * 0.10 * pagoTrafico;


    /* BOC */

    const horasRuta =
        Number(document.getElementById("horasRuta").value);

    const puntosCercanos =
        Number(document.getElementById("puntosCercanos").value);

    const quiebre =
        Number(document.getElementById("quiebre").value);

    const efectividadVisita =
        Number(document.getElementById("efectividadVisita").value);


    const cumpleBOC =
        horasRuta >= 6 &&
        puntosCercanos >= 90 &&
        quiebre < 2 &&
        efectividadVisita >= 95;


    const valorBOC =
        cumpleBOC ? variable * 0.20 : 0;


    /* ADICIONALES */

    const hallazgos =
        Number(document.getElementById("hallazgos").value);

    const puntosNuevos =
        Number(document.getElementById("puntosNuevos").value);

    const grossPDV =
        Number(document.getElementById("grossPDV").value);


    let adicionales = 0;

    if (hallazgos > 80) {
        adicionales += 50000;
    }

    if (puntosNuevos >= 10) {
        adicionales += 50000;
    }

    if (grossPDV >= 80) {
        adicionales += 50000;
    }


    /* TOTAL */

    const total =
        valorEfectividad +
        valorColocacion +
        valorFoco +
        valorTrafico +
        valorBOC +
        adicionales;


    document.getElementById("total").innerHTML =
        "$" + Math.round(total).toLocaleString("es-CO");


    document.getElementById("detalle").innerHTML = `

        <p>Efectividad: 
        $${Math.round(valorEfectividad).toLocaleString("es-CO")}
        </p>

        <p>Colocación:
        $${Math.round(valorColocacion).toLocaleString("es-CO")}
        </p>

        <p>Paquete foco:
        $${Math.round(valorFoco).toLocaleString("es-CO")}
        </p>

        <p>Tráfico:
        $${Math.round(valorTrafico).toLocaleString("es-CO")}
        </p>

        <p>BOC:
        $${Math.round(valorBOC).toLocaleString("es-CO")}
        </p>

        <p>Adicionales:
        $${adicionales.toLocaleString("es-CO")}
        </p>
    `;
}