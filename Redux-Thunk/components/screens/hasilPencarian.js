import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { fetchData } from '../../src/store/actions/actions';

const HasilPencarian = ({route}) => {
    inputData = route.params.inputData;
    lokAwal = inputData["lokAwal"];
    lokTujuan = inputData["lokTujuan"];
    tglBerangkat = inputData["tglBerangkat"];
    isLokAwalBlank = false;
    isLokTujuanBlank = false;
    isTglBerangkatBlank = false;

    if(lokAwal == ''){
      isLokAwalBlank =  true;
    }
    if(lokTujuan == '') {
      isLokTujuanBlank = true;
    }
    if(tglBerangkat == '') {
      isTglBerangkatBlank = true;
    }

    const data = useSelector((state) => state.items);
    const dispatch = useDispatch();
    

    useEffect(() => {
      dispatch(fetchData());
    }, []);

    if (isLokAwalBlank && isLokTujuanBlank && isTglBerangkatBlank) {
      filteredData = data;
    } else if (isLokAwalBlank && isLokTujuanBlank){
      filteredData = data.filter(item => item.tglBerangkat === tglBerangkat);
    } else if (isLokTujuanBlank && isTglBerangkatBlank) {
      filteredData = data.filter(item => item.lokAwal === lokAwal);
    } else if (isLokAwalBlank && isTglBerangkatBlank) {
      filteredData = data.filter(item => item.lokTujuan === lokTujuan);
    } else if(isLokAwalBlank) {
      filteredData = data.filter(item => item.tglBerangkat === tglBerangkat).filter(item => item.lokTujuan === lokTujuan);
    } else if(isLokTujuanBlank) {
      filteredData = data.filter(item => item.tglBerangkat === tglBerangkat).filter(item => item.lokAwal === lokAwal);
    } else if(isTglBerangkatBlank) {
      filteredData = data.filter(item => item.lokAwal === lokAwal).filter(item => item.lokTujuan === lokTujuan);
    } else {
      filteredData = data.filter(item => item.lokAwal === lokAwal).filter(item => item.lokTujuan === lokTujuan).filter(item => item.tglBerangkat === tglBerangkat);
    }

    if (filteredData == '') {
      filteredData = false;
    }
    

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.textHeader}>Hiling.id</Text>
          <Text style={styles.textHeader2}>Hasil Pencarian Penerbangan</Text>
          {
            tglBerangkat === '' ? (
              <Text style={styles.textHeader2}>{tglBerangkat}</Text>
            ) : (
              <Text style={styles.textHeader2}>({tglBerangkat})</Text>
            )
          }
        </View>
        <View style={styles.infoArea}>
            {
              filteredData ? (
                <View style={styles.flightSchedContainer}>
                      <FlatList
                        data={filteredData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                          <View style={styles.flightSchedBox}>

                            <View>
                              <Text style={{fontSize: 16}}>{item.nomorPenerbangan}</Text>
                              <View style={{flex: 1, flexDirection: "row", alignItems: "center", marginTop: 20}}>
                                <FontAwesome name="plane" size={30} style={{ color: "yellow" }}/>
                                <Text style={{marginLeft: 10, fontSize: 16, fontWeight: "600"}}>{item.namaMaskapai}</Text>
                              </View>
                            </View>

                            <View style={{alignItems: "center"}}>
                              <Text style={{fontSize: 20, fontWeight: "600"}}>{item.lokAwal}-{item.lokTujuan}</Text>
                              <Text style={{marginTop: 22, color: "grey", fontSize: 16, fontWeight: "500"}}>{item.tglBerangkat}</Text>
                            </View>

                          </View>
                        )}
                      />
                </View>
              ) : (
                <View style={styles.notFoundBox}>
                  <Text style={styles.notFoundText}>DATA TIDAK DITEMUKAN! PERIKSA INPUTAN DATA!</Text>
                </View>
              )}
          </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    box: {
      backgroundColor: "purple",
      flex: 1,
      padding: 20,
    },
    textHeader: {
      textAlign: "center",
      color: "white",
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 10,
    },
    textHeader2: {
      textAlign: "center",
      color: "white",
      fontSize: 16,
      fontWeight: "400",
    },
    infoArea :{
      backgroundColor: "skyblue",

      width: "100%",
      height: "85%",
    },
    flightSchedContainer :{
      flex: 1,
      marginTop: 26,
      marginLeft: "10%",
      marginBottom: 26,
    },
    flightSchedBox: {
      flex: 1,
      width: "90%",
      height: 100,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",

      marginTop: 20,
      padding: 15,

      backgroundColor: "white",
    },
    notFoundBox: {
      backgroundColor: "white",

      width: "80%",
      height: "35%",

      marginTop: "20%",
      marginLeft: "10%",
      alignItems: "center",
      justifyContent: "center",

      borderRadius: 10,
    },
    notFoundText: {
      fontSize: 28,
    },
  });

  export default HasilPencarian;