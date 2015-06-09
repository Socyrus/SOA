from django.shortcuts import render
# -*- coding: utf-8 -*-


def home(request):
    context = {'test': 123}
    return render(request, 'home.html', context)


def search(request):
    # context = (get something from API)
    users = [
        {'u_id': 1,
         'name': '556 1号机',
         'gender': 'm',
         'image': '/images/1.jpg',
         'time_created': '?',
                         'description': 'hahahahahaahahah',
                         'city': 'beijing',
                         'location': 'tsinghua',
                         'province': 'beijing',
                         'verfication': True,
                         'verified_type': 0,
                         'num_tewwts': 1,
                         'njumreci_relationship': 0,
                         'num_followers': 3,
                         'num_followees': 0},

        {'u_id': 1,
         'name': '556 2号机',
         'gender': 'm',
         'image': '/images/1.jpg',
         'time_created': '?',
         'description': 'hahahahahaahahah',
         'city': 'beijing',
         'location': 'tsinghua',
         'province': 'beijing',
         'verfication': True,
         'verified_type': 0,
         'num_tewwts': 1,
         'njumreci_relationship': 0,
         'num_followers': 3,
         'num_followees': 0},

        {'u_id': 1,
         'name': '556 3号机',
         'gender': 'm',
         'image': '/images/1.jpg',
         'time_created': '?',
         'description': 'hahahahahaahahah',
         'city': 'beijing',
         'location': 'tsinghua',
         'province': 'beijing',
         'verfication': True,
         'verified_type': 0,
         'num_tewwts': 1,
         'njumreci_relationship': 0,
         'num_followers': 3,
         'num_followees': 0}
    ]

    weibos = [
        {'text': 'balabala..',
         'time': '2014-09-25 19:54:22',
         'user':
         {'u_id': 1,
          'name': '556 2号机',
          'gender': 'm',
          'image': '/images/1.jpg',
          'time_created': '?',
          'description': 'hahahahahaahahah',
          'city': 'beijing',
          'location': 'tsinghua',
          'province': 'beijing',
          'verfication': True,
          'verified_type': 0,
          'num_tewwts': 1,
          'njumreci_relationship': 0,
          'num_followers': 3,
          'num_followees': 0},
         'original': 0,
         'original_weibo':
         {'text': 'balabala..',
          'time': '2014-09-25 19:54:22',
          'user':
          {'u_id': 1,
           'name': '556 2号机',
           'gender': 'm',
           'image': '/images/1.jpg',
           'time_created': '?',
                           'description': 'hahahahahaahahah',
           'city': 'beijing',
           'location': 'tsinghua',
           'province': 'beijing',
           'verfication': True,
           'verified_type': 0,
           'num_tewwts': 1,
           'njumreci_relationship': 0,
           'num_followers': 3,
           'num_followees': 0}
          }

         }
    ]
    context = {'users': users, 'weibos': weibos}
    return render(request, 'search_res.html', context)


def user(request):
    # context = (get something from API)
    user = {'u_id': 1,
            'name': '556 1号机',
            'gender': 'm',
            'image': '/images/1.jpg',
                     'time_created': '?',
                     'description': 'hahahahahaahahah',
                     'city': 'beijing',
                     'location': 'tsinghua',
                     'province': 'beijing',
                     'verfication': True,
                     'verified_type': 0,
                     'num_tewwts': 1,
                     'njumreci_relationship': 0,
                     'num_followers': 3,
                     'num_followees': 0}

    weibos = [
        {'text': 'balabala..',
         'time': '2014-09-25 19:54:22',
         'user':
         {'u_id': 1,
          'name': '556 2号机',
          'gender': 'm',
          'image': '/images/1.jpg',
          'time_created': '?',
          'description': 'hahahahahaahahah',
          'city': 'beijing',
          'location': 'tsinghua',
          'province': 'beijing',
          'verfication': True,
          'verified_type': 0,
          'num_tewwts': 1,
          'njumreci_relationship': 0,
          'num_followers': 3,
          'num_followees': 0},
         'original': 0,
         'original_weibo':
         {'text': 'balabala..',
          'time': '2014-09-25 19:54:22',
          'user':
          {'u_id': 1,
           'name': '556 2号机',
           'gender': 'm',
           'image': '/images/1.jpg',
           'time_created': '?',
           'description': 'hahahahahaahahah',
           'city': 'beijing',
           'location': 'tsinghua',
           'province': 'beijing',
           'verfication': True,
           'verified_type': 0,
           'num_tewwts': 1,
           'njumreci_relationship': 0,
           'num_followers': 3,
           'num_followees': 0}
          }

         },
        {'text': 'balabala..',
         'time': '2014-09-25 19:54:22',
         'user':
         {'u_id': 1,
          'name': '556 2号机',
          'gender': 'm',
          'image': '/images/1.jpg',
          'time_created': '?',
          'description': 'hahahahahaahahah',
          'city': 'beijing',
          'location': 'tsinghua',
          'province': 'beijing',
          'verfication': True,
          'verified_type': 0,
          'num_tewwts': 1,
          'njumreci_relationship': 0,
          'num_followers': 3,
          'num_followees': 0},
         'original': 1,
         'original_weibo':
         {'text': 'balabala..',
          'time': '2014-09-25 19:54:22',
          'user':
          {'u_id': 1,
           'name': '556 2号机',
           'gender': 'm',
           'image': '/images/1.jpg',
           'time_created': '?',
           'description': 'hahahahahaahahah',
           'city': 'beijing',
           'location': 'tsinghua',
           'province': 'beijing',
           'verfication': True,
           'verified_type': 0,
           'num_tewwts': 1,
           'njumreci_relationship': 0,
           'num_followers': 3,
           'num_followees': 0}
          }
         }
    ]

    evaluate = [
				{"uid" : 123,
				"pos_x" : -20,
				"pos_y" : 30,
				"social_value" : 0},
				{"uid" : 345,
				"pos_x" : 20,
				"pos_y" : 30,
				"social_value" : 1},
				{"uid" : 456,
				"pos_x" : 100,
				"pos_y" : 30,
				"social_value" : 2},
				{"uid" : 567,
				"pos_x" : 20,
				"pos_y" : 100,
				"social_value" : 3}
		]

    context = {'evaluate' : evaluate, 'user': user, 'weibos': weibos}
    return render(request, 'person.html', context)


def weibo(request):
    weibo = {'text': 'balabala..',
             'time': '2014-09-25 19:54:22',
             'user':
             {'u_id': 1,
              'name': '556 2号机',
              'gender': 'm',
              'image': '/images/1.jpg',
              'time_created': '?',
              'description': 'hahahahahaahahah',
              'city': 'beijing',
              'location': 'tsinghua',
              'province': 'beijing',
              'verfication': True,
              'verified_type': 0,
              'num_tewwts': 1,
              'njumreci_relationship': 0,
              'num_followers': 3,
              'num_followees': 0},
             'original': 0,
             'original_weibo':
             {'text': 'balabala..',
              'time': '2014-09-25 19:54:22',
              'user':
              {'u_id': 1,
               'name': '556 2号机',
               'gender': 'm',
               'image': '/images/1.jpg',
               'time_created': '?',
               'description': 'hahahahahaahahah',
               'city': 'beijing',
               'location': 'tsinghua',
               'province': 'beijing',
               'verfication': True,
               'verified_type': 0,
               'num_tewwts': 1,
               'njumreci_relationship': 0,
               'num_followers': 3,
               'num_followees': 0}
              }

             }

    statistics = {
            'aver_weibo': 30,
            'aver_followers': 20,
            'aver_followees': 1000,
            'gender_m': 100,
            'gender_f': 100,
            'verified': 20,
            'others': 100,
            'keywords': [
                {'word': 'hehe', 'frequency': 0.6},
                {'word': 'zxc', 'frequency': 0.3}
            ]


        }

    tree_node =  [
    	{'leafchild': 6,
      	'subtreeh': 3,
      	'father': -1},
      	{'leafchild': 2,
      	'subtreeh': 1,
      	'father': 0},
      	{'leafchild': 0,
      	'subtreeh': 0,
      	'father': 1},
      	{'leafchild': 0,
      	'subtreeh': 0,
      	'father': 1},
      	{'leafchild': 3,
      	'subtreeh': 2,
      	'father': 0},
      	{'leafchild': 3,
      	'subtreeh': 1,
      	'father': 4},
      	{'leafchild': 0,
      	'subtreeh': 0,
      	'father': 5},
      	{'leafchild': 0,
      	'subtreeh': 0,
      	'father': 5},
      	{'leafchild': 0,
      	'subtreeh': 0,
      	'father': 5},
      	{'leafchild': 0,
      	'subtreeh': 0,
      	'father': 0}
  	]

    context = {'tree_node' : tree_node,  'weibo': weibo, 'statistics': statistics}
    return render(request, 'weibo.html', context)
