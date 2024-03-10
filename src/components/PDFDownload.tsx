import { useEffect, useState } from "react"
import { PDFDownloadLink, Document, Page, View, Text,  } from '@react-pdf/renderer';
import dayjs from "dayjs";
import { Holiday } from "@/types/Holiday";

interface PDFDownloadProps {
  holidays: Holiday[]
}

export function PDFDownload({ holidays }: PDFDownloadProps) {
  const DocumentComponent = () => (
    <Document>
      <Page>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 30, margin: 10, fontSize: 14, width: '100%' }}>
          {holidays.map(holiday => (
            <View key={holiday.id} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              <View style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
                <Text>Title: {holiday.title}</Text>
                <Text style={{ marginLeft: 'auto', marginRight: 10, paddingRight: 10 }}>Date: {dayjs(holiday.date).format('MM/DD/YYYY')}</Text>
              </View>
              <Text style={{ marginLeft: 10 }}>Description: {holiday.description}</Text>
              <Text style={{ marginLeft: 10 }}>Location: {holiday.location}</Text>
              <View style={{ marginLeft: 10 }}>
                <Text>Participants:</Text>
                {holiday.participants?.map(participant => <Text key={participant}>{participant}</Text>)}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )

  return (
    <PDFDownloadLink className="text-red-500" document={<DocumentComponent />} fileName="holydays.pdf">
      {({ loading }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  )
}