// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line prettier/prettier
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Share } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const onShare = async () => {
    try {
      await Share.share({
        title: 'Quote of the day',
        message: `${quote} - ${author}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getQuote = () => {
    setIsLoading(true);
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(res => {
        setQuote(res.content);
        setAuthor(res.author);
        setIsLoading(false);
      });
  };

  const readQuote = () => {
    Tts.stop();
    Tts.speak(quote + " by" + author, {
      rate: 0.5,
      pitch: 1.2,
      language: 'en-US',
    });
    Tts.addEventListener('tts-start', event => {
      setIsSpeaking(true);
    });
    Tts.addEventListener('tts-finish', event => {
      setIsSpeaking(false);
    });
  };

  const copyClipboard = () => {
    Clipboard.setString(quote + " by" + author);
    Snackbar.show({
      text: 'Quote Copied!',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5372F0" />
      <View style={styles.mainView}>
        <Text style={styles.quoteText}>Quote of the Day</Text>
        <FontAwesome
          name="quote-left"
          size={20}
          color="#000"
          style={styles.quoteLeft}
        />
        <Text style={styles.quote}>{quote}</Text>
        <FontAwesome
          name="quote-right"
          size={20}
          color="#000"
          style={styles.quoteRight}
        />
        <Text style={styles.author}>---- {author}</Text>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#5372F0"
            style={{ marginTop: 20 }}
          />
        ) : (
          <TouchableOpacity onPress={getQuote} style={styles.quoteButton}>

            <Text style={styles.buttonText}>New Quote</Text>
          </TouchableOpacity>
        )}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={readQuote}
            style={[
              styles.soundButton,
              { backgroundColor: isSpeaking ? '#5372F0' : 'white' },
            ]}>
            <FontAwesome
              name="volume-up"
              size={22}
              color={isSpeaking ? 'white' : '#5372F0'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={copyClipboard} style={styles.soundButton}>
            <FontAwesome name="copy" size={22} color="#5372F0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.soundButton}>
            <FontAwesome5 name="share-alt" size={22} color="#5372F0" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5372F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  quoteText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  quote: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  author: {
    fontSize: 16,
    color: '#4d4d4d',
    textAlign: 'right',
    fontWeight: '300',
    fontStyle: 'italic',
  },
  quoteButton: {
    backgroundColor: '#5372F0',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quoteLeft: {
    marginBottom: -10,
  },
  quoteRight: {
    marginTop: -10,
    textAlign: 'right',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  soundButton: {
    padding: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#5372F0',
    elevation: 10,
    backgroundColor: '#fff',
  },
});

export default App;
