import React from 'react';
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  section: {
    marginBottom: 20,
    borderBottom: '1px solid #cccccc',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666666',
  },
  value: {
    color: '#333333',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: -5,
    marginRight: -5,
  },
  gridItem: {
    width: '48%',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

const ResultPDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Project Information</Text>
        <View>
          <Text>
            <Text style={styles.label}>Project Name:</Text>
            <Text style={styles.value}>{formData.projectName}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Project Description:</Text>
            <Text style={styles.value}>{formData.projectDescription}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Client:</Text>
            <Text style={styles.value}>{formData.client}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Contractor:</Text>
            <Text style={styles.value}>{formData.contractor}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Maximum and Minimum Values</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text>
              <Text style={styles.label}>Max X:</Text>
              <Text style={styles.value}>{formData.max_X}</Text>
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text>
              <Text style={styles.label}>Min X:</Text>
              <Text style={styles.value}>{formData.min_X}</Text>
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text>
              <Text style={styles.label}>Max Y:</Text>
              <Text style={styles.value}>{formData.max_Y}</Text>
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text>
              <Text style={styles.label}>Min Y:</Text>
              <Text style={styles.value}>{formData.min_Y}</Text>
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text>
              <Text style={styles.label}>Max Z:</Text>
              <Text style={styles.value}>{formData.max_Z}</Text>
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text>
              <Text style={styles.label}>Min Z:</Text>
              <Text style={styles.value}>{formData.min_Z}</Text>
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ResultPDF;
