import 'package:flutter/material.dart';
import 'package:toonflix/screens/home_screen.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});
  // 이 위젯의 key를 stateless widget이라는 슈퍼클래스에 보냄.
  // 위젯은 ID같은 식별자 역할을 하는 key가 있다.

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: HomeScreen(),
    );
  }
}
