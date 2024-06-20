import NavBar from "../../components/NavBar/navBar.js";
import React, { useEffect, useState, useMemo } from "react";
import sessionToken from "../../utils/sessionToken.js";
import Styles from "./Cadastro.module.css";
import "../../index.css";
import "../../components/overlay.css";
import Load from "../../components/Load/load.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Switch,
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  getKeyValue,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { ocupacoes } from "../../utils/ocupacoes.js";
import { FaRegUser, FaHouseUser, FaSearch } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { MdFileUpload } from "react-icons/md";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../../api.js";

const Cadastro = () => {
  const [data, setData] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [load, setLoad] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    sessionToken({ page: "/login" }, navigate);
  }, [navigate]);

  let list = useAsyncList({
    async load({ signal }) {
      await getUsuarios({ signal })
        .then((response) =>{
          let json = response.data;
          setData(json);
          setLoad(false);
          return {
            items: json,
          };
        })
    },
  });

  const Residentes = (data) => {
    return data.filter((item) => item.Residente).length;
  };

  const dataLength = data ? data.length : 0;
  const numResidentes = data ? Residentes(data) : 0;

  const items = useMemo(() => {
    if (!data) {
      return [];
    }

    let itemsToDisplay = [...data];

    if (list.sortDescriptor) {
      itemsToDisplay.sort((a, b) => {
        let first = a[list.sortDescriptor.column];
        let second = b[list.sortDescriptor.column];

        if (!isNaN(first) && !isNaN(second)) {
          first = Number(first);
          second = Number(second);
        }

        let cmp = first < second ? -1 : 1;

        if (list.sortDescriptor.direction === "descending") {
          cmp *= -1;
        }

        return cmp;
      });
    }

    return itemsToDisplay;
  }, [data, list.sortDescriptor]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items;
    }

    return items.filter((item) =>
      Object.keys(item).some(
        (key) =>
          key !== "opcoes" &&
          String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    XLSX.writeFile(workbook, "usuarios_cadastrados.xlsx");
  };

  const [nome, setNome] = useState("");
  const [ocupacao, setOcupacao] = useState("");
  const [placa, setPlaca] = useState("");
  const [siape, setSiape] = useState("");
  const [residente, setResidente] = useState(false);
  const [showE, setShowE] = useState(false);
  const [showA, setShowA] = useState(false);

  const handleEdit = (item) => {
    setNome(item.Nome);
    setOcupacao(item.Ocupacão);
    setPlaca(item.Placa);
    setSiape(item.Siape);
    setResidente(item.Residente);
    setShowE(true);
  };

  let sessionTokenValue = localStorage.getItem("sessionToken");
  if (!sessionTokenValue) {
    return null;
  }

  return (
    <>
      {load && (
        <div className="overlay">
          <Load />
        </div>
      )}
      {showE && (
        <div
          className="overlay"
          onClick={(e) => {
            e.stopPropagation();
            setShowE(false);
            setShowA(false);
          }}
        ></div>
      )}
      {showA && (
        <div
          className="overlay"
          onClick={(e) => {
            e.stopPropagation();
            setShowA(false);
          }}
        ></div>
      )}
      <div id={Styles.body}>
        <NavBar />
        <div id={Styles.main}>
          <div id={Styles.header}>
            <h1>Usuários Cadastrados</h1>
            <Button
              color="primary"
              variant="flat"
              size="lg"
              onPressEnd={() => setShowA(true)}
            >
              Adicionar
            </Button>
          </div>
          <div id={Styles.dashboard}>
            <div id={Styles.stats}>
              <Card isBlurred>
                <CardBody className={Styles.cardBody}>
                  <div className={Styles.cardName}>
                    <FaRegUser size={31} />
                    <h4>Usuários</h4>
                  </div>
                  <h2>{dataLength}</h2>
                </CardBody>
              </Card>
              <Card>
                <CardBody className={Styles.cardBody}>
                  <div className={Styles.cardName}>
                    <FaHouseUser size={32} />
                    <h4>Residentes</h4>
                  </div>
                  <h2>{numResidentes}</h2>
                </CardBody>
              </Card>
              <div id={Styles.cardbuttons}>
                <Button
                  color="success"
                  onPressEnd={exportToExcel}
                  startContent={<MdFileUpload color="white" />}
                  endContent={<RiFileExcel2Line color="white" />}
                >
                  Exportar para o Excel
                </Button>
              </div>
            </div>
            <Card>
              <CardBody id={Styles.search}>
                <Input
                  type="text"
                  label="Pesquisa"
                  variant="underlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button radius="sm" variant="light">
                  <FaSearch />
                </Button>
              </CardBody>
            </Card>
          </div>
          <Table
            isStriped
            aria-label="Example static collection table"
            className={Styles.myTable}
            isHeaderSticky
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
          >
            <TableHeader>
              <TableColumn key="Nome" allowsSorting>
                NOME
              </TableColumn>
              <TableColumn key="Ocupacão" minWidth={250} allowsSorting>
                OCUPAÇÃO
              </TableColumn>
              <TableColumn key="Placa" minWidth={100} allowsSorting>
                PLACA
              </TableColumn>
              <TableColumn key="Siape" minWidth={100} allowsSorting>
                SIAPE
              </TableColumn>
              <TableColumn key="Residente" minWidth={100} allowsSorting>
                RESIDENTE
              </TableColumn>
              <TableColumn minWidth={300}>OPÇÕES</TableColumn>
            </TableHeader>
            <TableBody>
              {(searchTerm === null ? items : filteredItems).map(
                (item, index) => (
                  <TableRow key={index}>
                    {Object.keys(item).map((columnKey) => {
                      if (columnKey === "Residente") {
                        return (
                          <TableCell key={columnKey}>
                            {item[columnKey] ? "Residente" : "Não residente"}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={columnKey}>
                            {getKeyValue(item, columnKey)}
                          </TableCell>
                        );
                      }
                    })}
                    <TableCell>
                      <div className={Styles.buttons}>
                        <Button
                          color="primary"
                          variant="bordered"
                          onPressEnd={() => handleEdit(item)}
                        >
                          ALTERAR
                        </Button>
                        <Button color="danger" variant="bordered">
                          DELETAR
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        {showE && (
          <div id={Styles.edit}>
            <h2>Alteração de cadastro</h2>
            <Input
              isRequired
              type="text"
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Autocomplete
              defaultItems={ocupacoes}
              label="Ocupação"
              isRequired
              inputValue={ocupacao}
              onChange={(e) => setOcupacao(e.target.value)}
            >
              {(ocupacoes) => (
                <AutocompleteItem key={ocupacoes.value}>
                  {ocupacoes.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Input
              isRequired
              type="text"
              label="Placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
            <Input
              isRequired
              type="number"
              label="siape"
              value={siape}
              onChange={(e) => setSiape(e.target.value)}
            />
            <Switch
              isRequired
              defaultSelected
              isSelected={residente}
              onChange={(e) => setResidente(e.target.checked)}
            >
              Residente
            </Switch>
            <div className={Styles.buttons}>
              <Button
                color="primary"
                variant="flat"
                size="lg"
                onPressEnd={() => {
                  setShowE(false);
                }}
              >
                Salvar
              </Button>
              <Button
                color="warning"
                variant="flat"
                size="lg"
                onPressEnd={() => {
                  setShowE(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
        {showA && (
          <div id={Styles.edit}>
            <h2>Adicionar Usuário</h2>
            <Input
              isRequired
              type="text"
              label="Nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <Autocomplete
              isRequired
              defaultItems={ocupacoes}
              label="Ocupação"
              onChange={(e) => setOcupacao(e.target.value)}
            >
              {(ocupacoes) => (
                <AutocompleteItem key={ocupacoes.value}>
                  {ocupacoes.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Input
              isRequired
              type="text"
              label="Placa"
              onChange={(e) => setPlaca(e.target.value)}
            />
            <Input
              isRequired
              type="number"
              label="siape"
              onChange={(e) => setSiape(e.target.value)}
            />
            <Switch isRequired onChange={(e) => setResidente(e.target.checked)}>
              Residente
            </Switch>
            <div className={Styles.buttons}>
              <Button
                color="primary"
                variant="flat"
                size="lg"
                onPressEnd={() => {
                  setShowA(false);
                }}
              >
                Adicionar
              </Button>
              <Button
                color="warning"
                variant="flat"
                size="lg"
                onPressEnd={() => {
                  setShowA(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cadastro;
