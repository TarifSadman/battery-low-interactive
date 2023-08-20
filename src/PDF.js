// ResultPDF.js
import React from 'react';
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    marginLeft: 5,
  },
});

const ResultPDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Maximum and Minimum Values</Text>
        {Object.keys(formData).map(key => (
          <View key={key} style={styles.section}>
            <Text>
              <Text style={styles.label}>{key}: </Text>
              <Text style={styles.value}>{formData[key]}</Text>
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResultPDF;
