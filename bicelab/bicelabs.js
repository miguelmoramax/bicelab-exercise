/* Resuelve los siguientes enunciados agregando el código abajo de cada función (donde dice Code Here) */
/* La pregunta 0 es un ejemplo de como debe ser el desarrollo */
/* La solución debe ser posible ejecutarla en cualquier interprete de JavaScript browser o node */

const clients = [
  { id: 1, rut: "86620855", name: "DANIEL TORO" },
  { id: 2, rut: "7317855K", name: "NICOLAS DUJOVNE" },
  { id: 3, rut: "73826497", name: "ERNESTO BRICENO" },
  { id: 4, rut: "88587715", name: "JORDAN RODRIGUEZ" },
  { id: 5, rut: "94020190", name: "ALEJANDRO PINTO" },
  { id: 6, rut: "99804238", name: "DENIS RODRIGUEZ" },
];

const accounts = [
  { clientId: 6, insuranceId: 1, balance: 15000 },
  { clientId: 1, insuranceId: 3, balance: 18000 },
  { clientId: 5, insuranceId: 3, balance: 135000 },
  { clientId: 2, insuranceId: 2, balance: 5600 },
  { clientId: 3, insuranceId: 1, balance: 23000 },
  { clientId: 5, insuranceId: 2, balance: 15000 },
  { clientId: 3, insuranceId: 3, balance: 45900 },
  { clientId: 2, insuranceId: 3, balance: 19000 },
  { clientId: 4, insuranceId: 3, balance: 51000 },
  { clientId: 5, insuranceId: 1, balance: 89000 },
  { clientId: 1, insuranceId: 2, balance: 1600 },
  { clientId: 5, insuranceId: 3, balance: 37500 },
  { clientId: 6, insuranceId: 1, balance: 19200 },
  { clientId: 2, insuranceId: 3, balance: 10000 },
  { clientId: 3, insuranceId: 2, balance: 5400 },
  { clientId: 3, insuranceId: 1, balance: 9000 },
  { clientId: 4, insuranceId: 3, balance: 13500 },
  { clientId: 2, insuranceId: 1, balance: 38200 },
  { clientId: 5, insuranceId: 2, balance: 17000 },
  { clientId: 1, insuranceId: 3, balance: 1000 },
  { clientId: 5, insuranceId: 2, balance: 600 },
  { clientId: 6, insuranceId: 1, balance: 16200 },
  { clientId: 2, insuranceId: 2, balance: 10000 },
];

const insurances = [
  { id: 1, name: "SEGURO APV" },
  { id: 2, name: "SEGURO DE VIDA" },
  { id: 3, name: "SEGURO COMPLEMENTARIO DE SALUD" },
];

/* 0.- EJEMPLO: Arreglo con los ids de clientes */
function listClientsIds() {
  /* CODE HERE */
  return clients.map((client) => client.id);
}

/* 1.- Arreglo con los ids de clientes ordenados por rut */
function listClientsIdsSortedByRUT() {
  /* CODE HERE */
  // Ordenado de menor a mayor rut
  return clients
    .sort((a, b) => (a.rut < b.rut ? -1 : Number(a.rut > b.rut)))
    .map((client) => client.id);
}

/* 2.- Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los seguros que participa. */
function sortClientsTotalBalances() {
  /* CODE HERE */
  // Arreglo de clients y accounts por client.id y account.clientId,
  // mostrando la suma de los balances en total
  const clientsAccounts = clients.map((client) => {
    const account = accounts
      .filter((account) => client.id === account.clientId)
      .reduce((a, b) => a + b.balance, 0);

    return { ...client, totalBalance: account };
  });

  // ordenamos por balance total de cada cuenta por cliente y retornamos arreglo con los nombres requeridos
  const sortedByTotalBalance = clientsAccounts
    .sort((a, b) => b.totalBalance - a.totalBalance)
    .map((client) => client.name);
  return sortedByTotalBalance;
}

/* 3.- Objeto en que las claves sean los nombres de los seguros y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre. */
function insuranceClientsByRUT() {
  /* CODE HERE */
  // ordenamos alfabeticamente por nombre arreglo clientes
  const rutSortedByName = clients
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name))
    .map((e) => e);

  // creamos objeto solicitado
  const result = insurances.reduce((acc, item) => {
    // union entre insurance y accounts  por insurance.id y accounts.insuranceId
    const unionInsuranceAccounts = accounts
      .filter((v) => v.insuranceId === item.id)
      .map((e) => e)
      // union entre arreglo de ruts ordenados y union de insurance-accounts
      .reduce((acc, item) => {
        const unionCLientInsurance = rutSortedByName
          .filter((val) => val.id === item.clientId)
          .map((el) => el.rut);
        // creamos el arreglo a desplegar, eliminando ruts repetidos
        acc = [...new Set(acc.concat(unionCLientInsurance))];
        return acc;
      }, []);
    // asignamos a cada clave, el valor solicitado
    acc[item.name] = unionInsuranceAccounts;
    return acc;
  }, {});
  return result;
}

/* 4.- Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 30.000 en el "Seguro APV" */
function higherClientsBalances() {
  /* CODE HERE */
  return (
    accounts
      // filtramos por seguro correspondiente a APV, por ID y por balance mayor a 30000
      .filter((account) => account.insuranceId === 1 && account.balance > 30000)
      // ordenamos por balance mayor a menor
      .sort((a, b) => b.balance - a.balance)
      // retornamos por balance
      .map((e) => e.balance)
  );
}

/* 5.- Arreglo con ids de los seguros ordenados crecientemente por la cantidad TOTAL de dinero que administran. */
function insuranceSortedByHighestBalance() {
  /* CODE HERE */
  // Realizamos union entre insurances y accounts
  const insuranceAccounts = insurances.map((insurance) => {
    const account = accounts
      // filtramos por insurance.id y account.id, para obtener la relación entre ambos
      .filter((account) => insurance.id === account.insuranceId)
      // calculamos el total de dinero que cada seguro administra
      .reduce((a, b) => a + b.balance, 0);
    // retornamos un arreglo con  id y balance total
    return { insurance: insurance.id, totalBalance: account };
  });

  // ordenamos arreglo obtenido previamente
  const sorted = insuranceAccounts
    // ordenamos por balance menor a mayor
    .sort((a, b) => a.totalBalance - b.totalBalance)
    // mostramos el id solicitado
    .map((e) => e.insurance);
  return sorted;
}

/* 6.- Objeto en que las claves sean los nombres de los Seguros y los valores el número de clientes que solo tengan cuentas en ese seguro. */
function uniqueInsurance() {
  /* CODE HERE */
  // creamos el arreglo que mostraremos al final
  const result = insurances.reduce((acc, insurance) => {
    acc[insurance.name] = 0;
    return acc;
  }, {});

  // obtenemos un arreglo con los ids de clientes que perteneces a las cuentas, eliminamos los duplicados
  const clientIds = [...new Set(accounts.map((account) => account.clientId))];

  // recorremos el arreglo obtenido con los ids de clientes por cada cuenta
  clientIds.forEach((clientId) => {
    const insuranceIds = accounts
      // filtramos para obtener las cuentas a las que pertenece cada cliente
      .filter((account) => account.clientId === clientId)
      .map((account) => account.insuranceId);
    // Verificamos si el arreglo filtrado tiene un id único
    if (new Set(insuranceIds).size === 1) {
      // si cumple, buscamos el nombre del seguro asociado a ese id
      const insuranceName = insurances.find(
        (insurance) => insurance.id === insuranceIds[0]
      ).name;
      // incrementamos el valor en caso de cumplir la condición
      result[insuranceName] += 1;
    }
  });
  return result;
}

/* 7.- Objeto en que las claves sean los nombres de los Seguros y los valores el id de su cliente con menos fondos. */
function clientWithLessFunds() {
  /* CODE HERE */
  // creamos el objecto a mostrar
  const result = insurances.reduce((acc, item) => {
    // buscamos el minimo balance en accounts
    const minBalance = accounts
      // filtramos por el insuranceId en accounts, y el item.id de insurance
      .filter((v) => v.insuranceId === item.id)
      // luego generamos el orden entre ambos arreglos, según el criterio balance
      .reduce((previous, current) => {
        return current.balance < previous.balance ? current : previous;
      });
    // asigamos el nombre del insurance con el id de cliente que cumple la condición entregada
    acc[item.name] = minBalance.clientId;
    return acc;
  }, {});
  return result;
}

/* 8.- Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el "SEGURO COMPLEMENTARIO DE SALUD" con un saldo de 15000 para este nuevo cliente.  */
// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
// NO MODIFICAR ARREGLOS ORIGINALES PARA NO ALTERAR LAS RESPUESTAS ANTERIORES AL EJECUTAR LA SOLUCIÓN
function newClientRanking() {
  /* CODE HERE */
  // creamos nuevos objetos a agregar en los respectivos arreglos
  const newClient = { id: 18, rut: "11.111.111-1", name: "MIGUEL MORA" };
  const newAccount = {
    clientId: 18,
    insuranceId: 3,
    balance: 15000,
  };
  // agregamos dichos objetos a los respectivos clientes, usamos CONCAT para no mutar los arreglos originales
  const newClients = clients.concat(newClient);
  const newAccounts = accounts.concat(newAccount);

  // Arreglo de clients y accounts por client.id y account.clientId,
  // mostrando la suma de los balances en total
  const clientsAccounts = newClients.map((client) => {
    const account = newAccounts
      .filter((account) => client.id === account.clientId)
      .reduce((a, b) => a + b.balance, 0);
    return { ...client, totalBalance: account };
  });

  const sortedByTotalBalance =
    clientsAccounts
      // ordenamos por balance total de cada cuenta por cliente
      .sort((a, b) => b.totalBalance - a.totalBalance)
      // buscamos el indice en el arreglo obtenido previamente según ID, sumamos 1 para obtener lugar en ranking
      .findIndex((clientAccount) => clientAccount.id === newClient.id) + 1;
  return sortedByTotalBalance;
}

/* Impresión de soluciones. No modificar. */
console.log("--------------- Start Pregunta 0 ---------------");
console.log(listClientsIds());
console.log("--------------- End Pregunta 0 ---------------");
console.log("--------------- Start Pregunta 1 ---------------");
console.log(listClientsIdsSortedByRUT());
console.log("--------------- End Pregunta 1 ---------------");
console.log("--------------- Start Pregunta 2 ---------------");
console.log(sortClientsTotalBalances());
console.log("--------------- End Pregunta 2 ---------------");
console.log("--------------- Start Pregunta 3 ---------------");
console.log(insuranceClientsByRUT());
console.log("--------------- End Pregunta 3 ---------------");
console.log("--------------- Start Pregunta 4 ---------------");
console.log(higherClientsBalances());
console.log("--------------- End Pregunta 4 ---------------");
console.log("--------------- Start Pregunta 5 ---------------");
console.log(insuranceSortedByHighestBalance());
console.log("--------------- End Pregunta 5 ---------------");
console.log("--------------- Start Pregunta 6 ---------------");
console.log(uniqueInsurance());
console.log("--------------- End Pregunta 6 ---------------");
console.log("--------------- Start Pregunta 7 ---------------");
console.log(clientWithLessFunds());
console.log("--------------- End Pregunta 7 ---------------");
console.log("--------------- Start Pregunta 8 ---------------");
console.log(newClientRanking());
console.log("--------------- End Pregunta 8 ---------------");
