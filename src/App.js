import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChevronRight, ChevronLeft, Home, CheckCircle, ArrowRight } from 'lucide-react';

const LegacyDesignDiagnosis = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  // 質問データとスコアリングマトリックス
  const questions = [
    {
      id: 1,
      category: "価値観と人生の優先事項",
      question: "あなたにとって、人生で最も大切にしているものは何ですか？",
      options: [
        { text: "家族との関係", scores: { family: 5, social: 1, self: 1, pragmatic: 2, memory: 3 } },
        { text: "社会への貢献", scores: { family: 1, social: 5, self: 2, pragmatic: 2, memory: 2 } },
        { text: "個人的な成果や経験", scores: { family: 1, social: 2, self: 5, pragmatic: 2, memory: 2 } },
        { text: "収集した物や財産", scores: { family: 2, social: 0, self: 2, pragmatic: 5, memory: 1 } },
        { text: "知識や知恵の継承", scores: { family: 3, social: 3, self: 2, pragmatic: 1, memory: 5 } }
      ]
    },
    {
      id: 2,
      category: "価値観と人生の優先事項",
      question: "将来、あなたが最も記憶に残ってほしいのはどのような側面ですか？",
      options: [
        { text: "家族への愛情と支援", scores: { family: 5, social: 1, self: 1, pragmatic: 1, memory: 3 } },
        { text: "社会や他者への貢献", scores: { family: 1, social: 5, self: 2, pragmatic: 1, memory: 2 } },
        { text: "達成した目標や成功", scores: { family: 1, social: 2, self: 5, pragmatic: 3, memory: 2 } },
        { text: "個性や人柄", scores: { family: 3, social: 2, self: 4, pragmatic: 1, memory: 3 } },
        { text: "残した作品や財産", scores: { family: 2, social: 1, self: 3, pragmatic: 4, memory: 2 } }
      ]
    },
    {
      id: 3,
      category: "物理的レガシーの傾向",
      question: "物理的な遺品について、あなたはどのように考えていますか？",
      options: [
        { text: "できるだけ多くを家族に残したい", scores: { family: 5, social: 0, self: 2, pragmatic: 1, memory: 3 } },
        { text: "特に価値のあるものだけ選んで残したい", scores: { family: 3, social: 1, self: 3, pragmatic: 4, memory: 3 } },
        { text: "必要最小限にして家族の負担を減らしたい", scores: { family: 4, social: 2, self: 1, pragmatic: 5, memory: 1 } },
        { text: "物よりも思い出や経験を重視したい", scores: { family: 3, social: 2, self: 3, pragmatic: 1, memory: 5 } },
        { text: "寄付など社会貢献に役立てたい", scores: { family: 1, social: 5, self: 1, pragmatic: 3, memory: 1 } }
      ]
    },
    {
      id: 4,
      category: "物理的レガシーの傾向",
      question: "所有物の整理について、どの方法が最も自分に合っていると思いますか？",
      options: [
        { text: "生前から計画的に整理していきたい", scores: { family: 3, social: 2, self: 2, pragmatic: 5, memory: 3 } },
        { text: "特に貴重なものだけリスト化しておきたい", scores: { family: 3, social: 1, self: 3, pragmatic: 4, memory: 3 } },
        { text: "専門家に任せたい", scores: { family: 1, social: 2, self: 1, pragmatic: 5, memory: 0 } },
        { text: "家族に任せたい", scores: { family: 5, social: 0, self: 1, pragmatic: 2, memory: 1 } },
        { text: "特に考えていない", scores: { family: 1, social: 1, self: 3, pragmatic: 1, memory: 1 } }
      ]
    },
    {
      id: 5,
      category: "デジタルレガシーの意向",
      question: "デジタル資産（SNSアカウント、写真、メール等）についてどう考えていますか？",
      options: [
        { text: "すべて残して記録として保存してほしい", scores: { family: 3, social: 1, self: 3, pragmatic: 0, memory: 5 } },
        { text: "重要なものだけ選別して残してほしい", scores: { family: 3, social: 2, self: 2, pragmatic: 4, memory: 4 } },
        { text: "ほとんど削除してほしい", scores: { family: 1, social: 1, self: 1, pragmatic: 5, memory: 0 } },
        { text: "特定の人だけにアクセス権を与えたい", scores: { family: 4, social: 1, self: 3, pragmatic: 3, memory: 2 } },
        { text: "あまり考えていない", scores: { family: 1, social: 1, self: 2, pragmatic: 2, memory: 1 } }
      ]
    },
    {
      id: 6,
      category: "デジタルレガシーの意向",
      question: "オンライン上のあなたの存在について、理想的な扱いはどれですか？",
      options: [
        { text: "SNSなどのアカウントを記念アカウントとして残したい", scores: { family: 3, social: 3, self: 4, pragmatic: 1, memory: 5 } },
        { text: "重要な写真や投稿だけをアーカイブしてほしい", scores: { family: 3, social: 2, self: 3, pragmatic: 3, memory: 4 } },
        { text: "すべて削除してほしい", scores: { family: 1, social: 1, self: 1, pragmatic: 5, memory: 0 } },
        { text: "家族だけがアクセスできる形で残したい", scores: { family: 5, social: 0, self: 2, pragmatic: 3, memory: 3 } },
        { text: "特に希望はない", scores: { family: 1, social: 1, self: 2, pragmatic: 3, memory: 1 } }
      ]
    },
    {
      id: 7,
      category: "法的準備と伝達",
      question: "遺言書や終末期の意向について、どの程度準備していますか？",
      options: [
        { text: "すでに準備済み", scores: { family: 4, social: 3, self: 2, pragmatic: 5, memory: 3 } },
        { text: "考えているが準備はまだ", scores: { family: 3, social: 2, self: 2, pragmatic: 3, memory: 2 } },
        { text: "必要性は感じているが未着手", scores: { family: 3, social: 2, self: 2, pragmatic: 2, memory: 2 } },
        { text: "遠い将来の課題と考えている", scores: { family: 2, social: 1, self: 3, pragmatic: 1, memory: 1 } },
        { text: "特に必要だと思わない", scores: { family: 1, social: 1, self: 4, pragmatic: 0, memory: 1 } }
      ]
    },
    {
      id: 8,
      category: "法的準備と伝達",
      question: "重要な情報（口座情報、パスワードなど）の管理方法について、最も近いのは？",
      options: [
        { text: "すでに整理して家族と共有している", scores: { family: 5, social: 2, self: 1, pragmatic: 5, memory: 3 } },
        { text: "自分だけが分かる形で整理している", scores: { family: 2, social: 1, self: 4, pragmatic: 3, memory: 2 } },
        { text: "これから整理する予定", scores: { family: 3, social: 2, self: 2, pragmatic: 3, memory: 2 } },
        { text: "必要になったら考える", scores: { family: 2, social: 1, self: 3, pragmatic: 1, memory: 1 } },
        { text: "特に何もしていない", scores: { family: 1, social: 1, self: 3, pragmatic: 0, memory: 1 } }
      ]
    },
    {
      id: 9,
      category: "コミュニケーションと記憶",
      question: "あなたの思いや考えを残すのに、どの方法が最も魅力的ですか？",
      options: [
        { text: "手紙やメッセージ", scores: { family: 5, social: 1, self: 3, pragmatic: 2, memory: 4 } },
        { text: "日記や自分史", scores: { family: 2, social: 2, self: 5, pragmatic: 1, memory: 5 } },
        { text: "音声や動画記録", scores: { family: 3, social: 2, self: 4, pragmatic: 2, memory: 5 } },
        { text: "写真アルバム", scores: { family: 4, social: 1, self: 3, pragmatic: 2, memory: 5 } },
        { text: "直接の会話や思い出作り", scores: { family: 5, social: 2, self: 2, pragmatic: 3, memory: 3 } }
      ]
    },
    {
      id: 10,
      category: "コミュニケーションと記憶",
      question: "将来、あなたについて最も忘れられたくないことは何ですか？",
      options: [
        { text: "人への愛情や思いやり", scores: { family: 5, social: 3, self: 2, pragmatic: 1, memory: 3 } },
        { text: "信念や価値観", scores: { family: 2, social: 4, self: 5, pragmatic: 2, memory: 3 } },
        { text: "達成した成果", scores: { family: 1, social: 3, self: 5, pragmatic: 3, memory: 2 } },
        { text: "個性や人柄", scores: { family: 3, social: 2, self: 5, pragmatic: 1, memory: 3 } },
        { text: "共有した特別な瞬間", scores: { family: 5, social: 1, self: 2, pragmatic: 1, memory: 5 } }
      ]
    }
  ];

  // レガシータイプの定義
  const legacyTypes = {
    family: {
      name: "家族想い型",
      description: "家族想い型のあなたは、人生において家族との絆や関係性を最も重視します。思い出や家族の安心・幸福を守ることに価値を見出し、残すものを考える際も家族の視点を大切にします。",
      features: [
        "家族の思い出や歴史を大切にする傾向があります",
        "形あるものよりも、心の絆や思い出を重視します",
        "家族に負担をかけないよう配慮する姿勢があります"
      ],
      actions: [
        "家族史やメモリアルブックの作成を検討しましょう",
        "思い出の品を整理し、それぞれの由来や意味を記録しておきましょう",
        "家族との思い出づくりの時間を意識的に作りましょう"
      ]
    },
    social: {
      name: "社会貢献型",
      description: "社会貢献型のあなたは、自分の人生が社会にもたらす価値や影響を重視します。個人的な利益よりも、より良い社会の実現や次世代への貢献に意義を見出します。",
      features: [
        "社会的な価値や意義を重視する傾向があります",
        "個人の枠を超えた広い視野を持っています",
        "次世代や社会全体への影響を考慮します"
      ],
      actions: [
        "社会貢献活動やボランティアへの参加を検討しましょう",
        "知識や経験を社会に還元する方法を考えましょう",
        "寄付や遺贈など、社会への還元方法を計画しましょう"
      ]
    },
    self: {
      name: "自己表現型",
      description: "自己表現型のあなたは、個性や自己実現、人生での達成を重視します。自分らしさを表現し、個人としての足跡を残すことに価値を見出します。",
      features: [
        "個性や独自性を大切にする傾向があります",
        "自己実現や目標達成に高い価値を置きます",
        "自分の物語や経験を重視します"
      ],
      actions: [
        "自分史や回顧録の作成を検討しましょう",
        "趣味や創作活動の成果を整理・保存しましょう",
        "個人的な成果や経験を記録に残しましょう"
      ]
    },
    pragmatic: {
      name: "実用主義型",
      description: "実用主義型のあなたは、効率性と実用性を重視し、感情よりも論理的な判断を優先します。遺族への負担を最小限にし、実際的な準備を重視します。",
      features: [
        "効率的で実用的なアプローチを好みます",
        "感情よりも論理的な判断を重視します",
        "遺族の負担軽減を最優先に考えます"
      ],
      actions: [
        "重要書類や情報の整理・一元化を進めましょう",
        "専門家への相談や終活サービスの活用を検討しましょう",
        "デジタル資産を含む財産目録の作成を始めましょう"
      ]
    },
    memory: {
      name: "記憶継承型",
      description: "記憶継承型のあなたは、思い出や体験、知恵の保存と継承を重視します。物質的なものよりも、記憶や経験、知識を次世代に伝えることに価値を見出します。",
      features: [
        "思い出や経験の保存を重視します",
        "知識や知恵の継承に価値を見出します",
        "世代を超えた繋がりを大切にします"
      ],
      actions: [
        "写真や動画の整理・デジタル化を進めましょう",
        "思い出の記録や体験談の文書化を検討しましょう",
        "家族の歴史や伝統の記録・継承方法を考えましょう"
      ]
    }
  };

  // スコア計算関数
  const calculateScores = () => {
    const scores = {
      family: 0,
      social: 0,
      self: 0,
      pragmatic: 0,
      memory: 0
    };

    Object.values(answers).forEach(answerIndex => {
      const question = questions.find(q => q.id === answerIndex.questionId);
      if (question && question.options[answerIndex.optionIndex]) {
        const optionScores = question.options[answerIndex.optionIndex].scores;
        Object.keys(scores).forEach(type => {
          scores[type] += optionScores[type] || 0;
        });
      }
    });

    return scores;
  };

  // 結果判定関数
  const determineResults = (scores) => {
    const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primaryType = sortedTypes[0][0];
    const secondaryType = sortedTypes[1][0];
    const isComposite = sortedTypes[0][1] - sortedTypes[1][1] <= 5;

    return {
      scores,
      primaryType,
      secondaryType,
      isComposite,
      radarData: Object.keys(scores).map(type => ({
        type: legacyTypes[type].name,
        score: scores[type],
        fullMark: 50
      }))
    };
  };

  // 質問への回答を記録
  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: {
        questionId: questions[currentQuestion].id,
        optionIndex
      }
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 診断完了
      const scores = calculateScores();
      const results = determineResults(scores);
      setResults(results);
      setCurrentPage('results');
    }
  };

  // ナビゲーション関数
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const startDiagnosis = () => {
    setCurrentPage('diagnosis');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const resetDiagnosis = () => {
    setCurrentPage('home');
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  // ホームページコンポーネント
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">レガシーデザイン診断</h1>
          <p className="text-xl text-gray-600 mb-8">あなたの「レガシースタイル」を診断します</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">このサービスについて</h2>
          <p className="text-gray-600 mb-6">
            レガシーデザイン診断は、約10問の質問を通じて、あなたの価値観や優先事項を分析し、
            「レガシースタイル」を判定するサービスです。
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">診断でわかること</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>あなたのレガシースタイル</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>価値観や優先事項の傾向</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>おすすめのアクション</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">所要時間</h3>
              <p className="text-gray-600 mb-3">約5〜10分</p>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">質問数</h3>
              <p className="text-gray-600">全10問</p>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={startDiagnosis}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition duration-200 flex items-center mx-auto"
            >
              診断を始める
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>このサービスはLegaTechが提供する統合レガシー管理サービスの一部です</p>
        </div>
      </div>
    </div>
  );

  // 診断ページコンポーネント
  const DiagnosisPage = () => {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">レガシーデザイン診断</h2>
              <span className="text-sm text-gray-600">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <p className="text-sm text-blue-600 font-semibold mb-2">{question.category}</p>
              <h3 className="text-2xl font-semibold text-gray-800">{question.question}</h3>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition duration-200"
                >
                  <span className="text-gray-700">{option.text}</span>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <div className="mt-8">
                <button
                  onClick={goToPreviousQuestion}
                  className="flex items-center text-gray-600 hover:text-gray-800 transition duration-200"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  前の質問に戻る
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 結果ページコンポーネント
  const ResultsPage = () => {
    if (!results) return null;

    const primaryTypeInfo = legacyTypes[results.primaryType];
    const secondaryTypeInfo = results.isComposite ? legacyTypes[results.secondaryType] : null;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">診断結果</h1>
            <p className="text-xl text-gray-600">あなたのレガシーデザインスタイルプロフィールが判明しました</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Legacy Design Style Profile
              </h2>
              <h3 className="text-3xl font-bold text-blue-600 mb-2">
                あなたのレガシータイプ：{primaryTypeInfo.name}
                {results.isComposite && ` + ${secondaryTypeInfo.name}`}
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                {results.isComposite
                  ? `あなたは${primaryTypeInfo.name}の特徴と${secondaryTypeInfo.name}の特徴を併せ持つ複合タイプです。`
                  : primaryTypeInfo.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">スコア分布</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={results.radarData}>
                    <PolarGrid stroke="#e0e0e0" />
                    <PolarAngleAxis dataKey="type" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 50]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="スコア"
                      dataKey="score"
                      stroke="#068ace"
                      fill="#068ace"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">あなたの特徴</h3>
              <ul className="space-y-3">
                {primaryTypeInfo.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">推奨アクション</h3>
              <div className="space-y-3">
                {primaryTypeInfo.actions.map((action, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">次のステップ</h3>
                <p className="text-gray-700 mb-4">
                  LegaTechの統合レガシー管理サービスで、あなたのレガシースタイルに合わせた
                  具体的な計画を立てることができます。
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center">
                  詳しく見る
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={resetDiagnosis}
                className="text-gray-600 hover:text-gray-800 underline transition duration-200"
              >
                もう一度診断する
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // メインレンダリング
  return (
    <div className="font-sans">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'diagnosis' && <DiagnosisPage />}
      {currentPage === 'results' && <ResultsPage />}
    </div>
  );
};

export default LegacyDesignDiagnosis;
