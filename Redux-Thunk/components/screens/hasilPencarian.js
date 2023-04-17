import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList } from 'react-native';

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
      filteredData = false;
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
                <View>
                      <FlatList
                        data={filteredData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                          <View>
                            <Text>Nomor Penerbangan: {item.nomorPenerbangan}</Text>
                            <Text>Lokasi Keberangkatan: {item.lokAwal}</Text>
                            <Text>Lokasi Tujuan: {item.lokTujuan}</Text>
                            <Text>Nama Maskapai: {item.namaMaskapai}</Text>
                            <Text>Tanggal Berangkat: {item.tglBerangkat}</Text>
                            <Text></Text>
                          </View>
                        )}
                      />
                </View>
              ) : (
                <View>
                  <Text>DATA TIDAK DITEMUKAN! PERIKSA INPUTAN DATA!</Text>
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
      backgroundColor: "red",
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
      backgroundColor: "grey",

      width: "100%",
      height: "85%",
    },
  });

  export default HasilPencarian;